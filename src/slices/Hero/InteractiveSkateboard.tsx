"use client"

import * as THREE from "three" 
import { Skateboard } from "@/components/Skateboard"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Canvas, ThreeEvent } from "@react-three/fiber"
import { Suspense, useRef, useState } from "react"
import gsap from "gsap"
import HotSpot from "./HotSpot"

type InteractiveSkateboardProps = {
    deckTextureURL: string
    wheelTextureURL: string
    truckColor: string
    boltColor: string
}

export default function InteractiveSkateboard({deckTextureURL, wheelTextureURL, truckColor, boltColor}: InteractiveSkateboardProps) {  
 
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <Canvas className="min-h-[60rem] w-full" camera={{position: [1.5, 1, 3] , fov: 50}}>
                <Suspense>
                    <Scene
                        deckTextureURL={deckTextureURL}
                        wheelTextureURL={wheelTextureURL}
                        truckColor={truckColor}
                        boltColor={boltColor} 
                    /> 
                </Suspense>
            </Canvas>
        </div>   
    )
}

function Scene({deckTextureURL, wheelTextureURL, truckColor, boltColor}: InteractiveSkateboardProps) {

    const containerRef = useRef<THREE.Group>(null)
    const originRef = useRef<THREE.Group>(null)

    const [showHotspot, setShowHotSpot] = useState<Record<string, boolean>>({
        front: true,
        middle: true,
        back: true
    })

    function onClick(event: ThreeEvent<MouseEvent>) {

        event.stopPropagation()

        const board = containerRef.current;
        const origin = originRef.current;

        if(!board || !origin) return

        const {name} = event.object;
        
        setShowHotSpot((current) => ({
            ...current,
            [name]: false
        }))

        if(name === "back"){
            Ollie(board)
        }
        else if(name === "middle"){
            Kickflip(board)
        }
        else if(name === "front"){
            FrontSide360(board, origin)
        }

    }

    function Ollie(board: THREE.Group) {

        JumpBoard(board);
            
        gsap.timeline().to(board.rotation, {
            x: -0.6,
            duration: 0.26,
            ease: "none"
        })
        .to(board.rotation, {
            x: 0.4,
            duration: 0.82,
            ease: "power2.in"
        })
        .to(board.rotation, {
            x: 0,
            duration: 0.12,
            ease: "none"
        })
    }

    function Kickflip(board: THREE.Group) {

        JumpBoard(board);
            
        gsap.timeline().to(board.rotation, {
            x: -0.6,
            duration: 0.26,
            ease: "none"
        })
        .to(board.rotation, {
            x: 0.4,
            duration: 0.82,
            ease: "power2.in"
        })
        .to(board.rotation, {
            z: `+=${Math.PI * 2}`,
            duration: 0.78,
            ease: "none"
        }, "<")
        .to(board.rotation, {
            x: 0,
            duration: 0.12,
            ease: "none"
        })  
    }

    function FrontSide360(board: THREE.Group, origin: THREE.Group) {
        JumpBoard(board);

        
        gsap.timeline()
        .to(board.rotation, {
            x: -0.6,
            duration: 0.26,
            ease: "none",
        })
        .to(board.rotation, {
            x: 0.4,
            duration: 0.82,
            ease: "power2.in",
        })
        .to(origin.rotation, {
            y: `+=${Math.PI * 2}`,
            duration: 0.77,
            ease: "none"
        }, 0.3)
        .to(board.rotation, {
            x: 0,
            duration: 0.14,
            ease: "none",
        })

    }

    function JumpBoard(board: THREE.Group) {

        gsap.timeline()
        .to(board.position, {
            y: 0.8,
            duration: 0.51,
            ease: "power2.out",
            delay: 0.26,
        })
        .to(board.position, {
            y: 0,
            duration: 0.43,
            ease: "power2.in",
        })
    }



    return(
        <group>
            <OrbitControls/>
            <Environment files={"/hdr/warehouse-256.hdr"}/>
            <group ref={originRef}>
                <group ref={containerRef} position={[-0.25, 0, -0.635]}>
                    <group position={[0, -0.086, 0.635]}>
                        <Skateboard 
                            wheelTextureURLs={[wheelTextureURL]} 
                            wheelTextureURL={wheelTextureURL} 
                            deckTextureURLs={[deckTextureURL]}
                            deckTextureURL={deckTextureURL}
                            truckColor={truckColor}
                            boltColor={boltColor}
                            constantWheelSpin
                        />
                       <HotSpot isVisible={showHotspot.front} position={[0, 0.38, 1]} color="#B8FC39"/>
                        <mesh position={[0, 0.27, 0.9]} name="front" onClick={onClick}>
                            <boxGeometry args={[0.6, 0.2, .58]}/>
                            <meshStandardMaterial visible={false}/>
                        </mesh>
                        <HotSpot isVisible={showHotspot.middle} position={[0, 0.38, 0]} color="#FF7A51"/>
                        <mesh position={[0, 0.27, 0]} name="middle" onClick={onClick}>
                            <boxGeometry args={[0.6, 0.1, 1.2]}/>
                            <meshStandardMaterial visible={false}/>
                        </mesh>
                        <HotSpot isVisible={showHotspot.back} position={[0, 0.38, -0.9]} color="#46ACFA"/>
                        <mesh position={[0, 0.27, -0.9]} name="back" onClick={onClick}>
                            <boxGeometry args={[0.6, 0.2, 0.58]}/>
                            <meshStandardMaterial visible={false}/>
                        </mesh>
                    </group>
                </group>
            </group>
                <ContactShadows opacity={0.6} position={[0, -0.08, 0]}/>
        </group>
    )
}