import { ExtractedShaderBackground } from "@/components/extracted-shader-background"

export default function ShaderTestPage() {
  console.log("[v0] ShaderTestPage rendering")

  return (
    <div className="w-full h-screen bg-white">
      <ExtractedShaderBackground>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h1 className="text-4xl font-bold text-white mb-4">Shader Test</h1>
            <p className="text-white/80">
              If you can see this text with an animated background, the shader is working.
            </p>
          </div>
        </div>
      </ExtractedShaderBackground>
    </div>
  )
}
