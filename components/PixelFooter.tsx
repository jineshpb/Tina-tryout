import React, { useRef, useEffect } from "react"
import p5 from "p5"
import Stats from "stats.js"

const PixelFooter: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<Stats | null>(null)

  useEffect(() => {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    statsRef.current = stats

    const sketch = (p: p5) => {
      let distMouse = 15
      let cols: number, rows: number
      let size = 10
      let offset = 4
      let blocks: Block[][] = []

      class Block {
        x: number
        y: number
        angle: number
        c: number

        constructor(x: number, y: number) {
          this.x = x
          this.y = y
          this.angle = 0
          this.c = 70
        }

        display() {
          p.noFill()
          p.stroke(this.c)
          p.push()
          p.translate(this.x, this.y)
          let margin = -size / 2
          p.line(
            margin + offset / 2,
            margin + offset / 2,
            margin + size - offset / 2,
            margin + size - offset / 2,
          )
          p.line(margin + size - offset / 2, size, size, margin + size)
          p.pop()
        }

        move() {
          let distance = p.dist(p.mouseX, p.mouseY, this.x, this.y)
          if (distance < distMouse) {
            this.angle = (this.angle + 1) % 360
            this.c = 255
          } else if (this.angle > 0) {
            this.angle = (this.angle + 1) % 360
            this.c = Math.max(70, this.c - 3)
          }
        }
      }

      p.setup = () => {
        const containerWidth = sketchRef.current
          ? sketchRef.current.offsetWidth
          : 400
        p.createCanvas(containerWidth, 400)
        p.rectMode(p.CENTER)
        p.angleMode(p.DEGREES)
        cols = Math.floor(p.width / size)
        rows = Math.floor(p.height / size)

        for (let i = 0; i < cols; i++) {
          blocks[i] = []
          for (let j = 0; j < rows; j++) {
            blocks[i][j] = new Block(size / 2 + i * size, size / 2 + j * size)
          }
        }
      }

      p.draw = () => {
        stats.begin()

        p.background(0)
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            blocks[i][j].move()
            blocks[i][j].display()
          }
        }

        stats.end()
      }
    }

    if (sketchRef.current) {
      const myP5 = new p5(sketch, sketchRef.current)

      return () => {
        myP5.remove()
        if (statsRef.current) {
          document.body.removeChild(statsRef.current.dom)
        }
      }
    }
  }, [])

  return <div ref={sketchRef}></div>
}

export default PixelFooter
