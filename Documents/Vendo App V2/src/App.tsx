import React from 'react'
import SideMenu from '../components/side-menu'
import CopilotChat from '../components/copilot-chat'
import ExtractedShaderBackground from '../components/extracted-shader-background'

function App() {
  return (
    <div className="h-screen">
      <ExtractedShaderBackground>
        <SideMenu />
        <main className="h-screen flex flex-col relative" style={{ marginLeft: "var(--sidebar-width, 256px)" }}>
          <CopilotChat />
        </main>
      </ExtractedShaderBackground>
    </div>
  )
}

export default App
