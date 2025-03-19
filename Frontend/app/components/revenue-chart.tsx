"use client"

import { useEffect, useRef } from "react"

export default function RevenueChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = (canvas as HTMLCanvasElement).getContext("2d")

    // Clear canvas
    ctx?.clearRect(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height)

    // Chart data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Nov","Dec"]
    const primaryData = [100, 80, 90, 70, 90, 50, 70, 90, 80,38,50]
    const secondaryData = [70, 60, 40, 80, 60, 40, 50, 60, 60,39,80]

    const maxValue = 100
    const chartHeight = (canvas as HTMLCanvasElement).height - 40 // Leave space for labels
    const barWidth = 20
    const gap = 10
    const groupWidth = barWidth * 2 + gap
    const leftPadding = 40

    // Draw y-axis labels
if (ctx) ctx.fillStyle = "#6B7280"
if (ctx) ctx.font = "12px Arial"
if (ctx) ctx.textAlign = "right"

    const yLabels = ["0", "20k", "50k", "80k", "100k"]
    const yLabelPositions = [chartHeight, chartHeight * 0.8, chartHeight * 0.5, chartHeight * 0.2, 0]

    yLabels.forEach((label, i) => {
      if (ctx) ctx.fillText(label, 30, yLabelPositions[i] + 20)
    })

    // Draw horizontal grid lines
if (ctx) ctx.strokeStyle = "#E5E7EB"
if (ctx) ctx.lineWidth = 1

    yLabelPositions.forEach((y) => {
      if (ctx) ctx.beginPath()
      if (ctx) ctx.moveTo(leftPadding, y + 20)
      if (ctx) ctx.lineTo((canvas as HTMLCanvasElement).width, y + 20)
      if (ctx) ctx.stroke()
    })

    // Draw bars
    months.forEach((month, i) => {
      const x = leftPadding + i * groupWidth + 20

      // Primary bar
      const primaryHeight = (primaryData[i] / maxValue) * chartHeight
if (ctx) ctx.fillStyle = "#4F46E5"
if (ctx) ctx.fillRect(x, chartHeight - primaryHeight + 20, barWidth, primaryHeight)

      // Secondary bar
      const secondaryHeight = (secondaryData[i] / maxValue) * chartHeight
if (ctx) ctx.fillStyle = "#E5E7EB"
if (ctx) ctx.fillRect(x + barWidth + gap, chartHeight - secondaryHeight + 20, barWidth, secondaryHeight)

      // Month label
if (ctx) ctx.fillStyle = "#6B7280"
if (ctx) ctx.font = "12px Arial"
if (ctx) ctx.textAlign = "center"
      if (ctx) ctx.fillText(month, x + barWidth + gap / 2, (canvas as HTMLCanvasElement).height - 5)
    })
  }, [])

  return <canvas ref={canvasRef} width={700} height={300} className="w-full h-[250px]" />
}

