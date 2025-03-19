"use client"

import { useEffect, useRef } from "react"

export default function DonutChart({ data }: { data: Array<{ value: number; color: string }> }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = (canvas as HTMLCanvasElement).getContext("2d")
    const centerX = (canvas as HTMLCanvasElement).width / 2
    const centerY = (canvas as HTMLCanvasElement).height / 2
    const radius = Math.min(centerX, centerY) * 0.8
    const innerRadius = radius * 0.6

    // Clear canvas
    if (ctx) ctx.clearRect(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height)

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw donut segments
    let startAngle = -0.5 * Math.PI // Start at top

    data.forEach((item) => {
      const segmentAngle = (item.value / total) * 2 * Math.PI

      if (ctx) ctx.beginPath()
      if (ctx) ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle)
      if (ctx) ctx.arc(centerX, centerY, innerRadius, startAngle + segmentAngle, startAngle, true)
      if (ctx) ctx.closePath()

      if (ctx) ctx.fillStyle = item.color
      if (ctx) ctx.fill()

      startAngle += segmentAngle
    })
  }, [data])

  return <canvas ref={canvasRef} width={120} height={120} />
}

