import { useCallback, useEffect, useState } from 'react'
import {
  wrapHighlightTagAroundRange,
  getHighlightElements,
  HighlightLocation,
} from './highlightGenerator'
import type { SelectionAttributes } from './highlightHelpers'

export function useSelection(
  highlightLocations: HighlightLocation[]
): [SelectionAttributes | null, (x: SelectionAttributes | null) => void] {
  const [touchStartPos, setTouchStartPos] =
    useState<{ x: number; y: number } | undefined>(undefined)
  const [selectionAttributes, setSelectionAttributes] =
    useState<SelectionAttributes | null>(null)

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      setTouchStartPos({
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      })
    },
    [touchStartPos, setTouchStartPos]
  )

  const handleFinishTouch = useCallback(
    async (mouseEvent: any) => {
      let wasDragEvent = false
      const tapAttributes = {
        tapX: mouseEvent.clientX,
        tapY: mouseEvent.clientY,
      }

      if (touchStartPos) {
        if (
          Math.abs(touchStartPos.x - mouseEvent.pageX) > 10 ||
          Math.abs(touchStartPos.y - mouseEvent.pageY) > 10
        ) {
          wasDragEvent = true
        }
      }

      window?.AndroidWebKitMessenger?.handleIdentifiableMessage(
        'userTap',
        JSON.stringify(tapAttributes)
      )

      const result = await makeSelectionRange()

      if (!result) {
        return setTimeout(() => {
          setSelectionAttributes(null)
        }, 100)
      }

      const { range, isReverseSelected, selection } = result
      const [selectionStart, selectionEnd] = wrapHighlightTagAroundRange(range)
      const rangeRect = rangeToPos(range, isReverseSelected)

      let shouldCancelSelection = false
      const overlapHighlights: HighlightLocation[] = []

      highlightLocations
        .sort((a, b) => {
          if (a.start < b.start) {
            return -1
          }
          if (a.start > b.start) {
            return 1
          }
          return 0
        })
        .forEach((highlightLocation) => {
          // Cancel operations if highlight is subset of existing highlight
          if (
            selectionStart >= highlightLocation.start &&
            selectionEnd <= highlightLocation.end
          ) {
            shouldCancelSelection = true
            return
          }

          if (
            selectionStart <= highlightLocation.end &&
            highlightLocation.start <= selectionEnd
          ) {
            overlapHighlights.push(highlightLocation)
          }
        })

      /* If selection overlaps existing highlights, compute and return the merged selection range */
      let mergedRange = null
      if (overlapHighlights.length) {
        let startNode, startOffset
        let endNode, endOffset
        let extendEndNode = false

        if (selectionStart <= overlapHighlights[0].start) {
          startNode = range.startContainer
          startOffset = range.startOffset
        } else {
          const highlightElems = getHighlightElements(overlapHighlights[0].id)
          startNode = highlightElems.shift()
          startOffset = 0
        }
        if (
          selectionEnd >= overlapHighlights[overlapHighlights.length - 1].end
        ) {
          endNode = range.endContainer
          endOffset = range.endOffset
        } else {
          const highlightElems = getHighlightElements(
            overlapHighlights[overlapHighlights.length - 1].id
          )
          endNode = highlightElems.pop()
          endOffset = 0
          /* end node is from highlight span, we must extend range until the end of highlight span */
          extendEndNode = true
        }
        if (!startNode || !endNode) {
          throw new Error('Failed to query node for computing new merged range')
        }
        mergedRange = new Range()
        mergedRange.setStart(startNode, startOffset)
        if (extendEndNode) {
          /* Extend the range to include the entire endNode container */
          mergedRange.setEndAfter(endNode)
        } else {
          mergedRange.setEnd(endNode, endOffset)
        }
      }

      if (shouldCancelSelection) {
        return setTimeout(() => {
          setSelectionAttributes(null)
        }, 100)
      }

      return setSelectionAttributes({
        selection,
        wasDragEvent,
        range: mergedRange ?? range,
        focusPosition: {
          x: rangeRect[isReverseSelected ? 'left' : 'right'],
          y: rangeRect[isReverseSelected ? 'top' : 'bottom'],
          isReverseSelected,
        },
        overlapHighlights: overlapHighlights.map(({ id }) => id),
      })
    },
    [touchStartPos, selectionAttributes, highlightLocations]
  )

  const copyTextSelection = useCallback(async () => {
    // Send message to Android to paste since we don't have the
    // correct permissions to write to clipboard from WebView directly
    window.AndroidWebKitMessenger?.handleIdentifiableMessage(
      'writeToClipboard',
      JSON.stringify({ quote: selectionAttributes?.selection.toString() })
    )
  }, [selectionAttributes?.selection])

  useEffect(() => {
    document.addEventListener('mouseup', handleFinishTouch)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleFinishTouch)
    document.addEventListener('contextmenu', handleFinishTouch)
    document.addEventListener('copyTextSelection', copyTextSelection)

    return () => {
      document.removeEventListener('mouseup', handleFinishTouch)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleFinishTouch)
      document.removeEventListener('contextmenu', handleFinishTouch)
      document.removeEventListener('copyTextSelection', copyTextSelection)
    }
  }, [
    highlightLocations,
    handleFinishTouch,
    copyTextSelection,
    touchStartPos,
    setTouchStartPos,
    handleTouchStart,
  ])

  return [selectionAttributes, setSelectionAttributes]
}

type MakeSelectionRangeOutput = {
  range: Range
  selection: Selection
  isReverseSelected: boolean
}

async function makeSelectionRange(): Promise<
  MakeSelectionRangeOutput | undefined
> {
  // Getting the selection a little bit after the mouseup event b/c the mouseup event is triggered earlier
  // than the selection is getting cleared
  const selection = await new Promise<Selection | null>((resolve) => {
    setTimeout(() => {
      resolve(document.getSelection())
    }, 100)
  })

  if (!selection || selection.isCollapsed || selection.rangeCount <= 0) {
    return undefined
  }

  const articleContentElement = document.getElementById('article-container')
  const recommendationsElement = document.getElementById(
    'recommendations-container'
  )

  if (!articleContentElement)
    throw new Error('Unable to find the article content element')

  const allowedRange = new Range()
  allowedRange.selectNode(articleContentElement)

  const range = selection.getRangeAt(0)

  if (recommendationsElement && range.intersectsNode(recommendationsElement)) {
    console.log('attempt to highlight in recommendations area')
    return undefined
  }

  const start = range.compareBoundaryPoints(Range.START_TO_START, allowedRange)
  const end = range.compareBoundaryPoints(Range.END_TO_END, allowedRange)
  const isRangeAllowed = start >= 0 && end <= 0

  const isReverseSelected =
    range.startContainer === selection.focusNode &&
    range.endOffset === selection.anchorOffset

  return isRangeAllowed ? { range, isReverseSelected, selection } : undefined
}

export type RangeEndPos = {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

const rangeToPos = (range: Range, getFirst = false): RangeEndPos => {
  if (typeof window === 'undefined' || !range) {
    return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }
  }

  const rects = range.getClientRects()

  if (!rects || !rects.length) {
    return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }
  }

  const rect = rects[getFirst ? 0 : rects.length - 1]
  return {
    left: window.scrollX + rect.left,
    top: window.scrollY + rect.top - 60,
    right: window.scrollX + rect.right,
    bottom: window.scrollY + rect.bottom + 5,
    width: rect.width,
    height: rect.height,
  }
}
