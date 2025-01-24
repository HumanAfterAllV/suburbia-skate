"use client"

import { Skateboard } from "@/components/Skateboard"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

export default function InteractiveSkateboard() {  
    
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <Canvas className="min-h-[60rem] w-full" camera={{position: [1.5, 1, 3] , fov: 50}}>
                <Suspense>
                    <Scene/> 
                </Suspense>
            </Canvas>
        </div>   
    )
}

function Scene() {
    return(
        <group>
            <OrbitControls/>
            <Environment files={"/hdr/warehouse-256.hdr"}/>
            <mesh>
                <meshStandardMaterial/>
                <Skateboard/>
                <ContactShadows opacity={0.6} position={[0, -0.08, 0]}/>
            </mesh>
        </group>
    )
}