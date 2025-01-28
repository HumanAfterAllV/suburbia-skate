"use client"

import { CameraControls, Environment, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three"
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useCustomizerControls } from "./Context";
import { asImageSrc } from "@prismicio/client";
import { Skateboard } from "@/components/Skateboard";

type PreviewProps = {
    wheelTextureURLs: string[];
    deckTextureURLs: string[];
}

const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";
const ENVIRONMENT_COLOR = "#3B3A3A";

export default function Preview({deckTextureURLs, wheelTextureURLs}: PreviewProps): React.JSX.Element {
    
    const cameraControls =  useRef<CameraControls>(null);
    const floorRef = useRef<THREE.Mesh>(null);
    const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } = useCustomizerControls();

    const wheelTextureURL = asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
    const deckTextureURL = asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
    const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
    const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;
    

    function onCameraControlStart() {
        if(!cameraControls.current || !floorRef.current || cameraControls.current.colliderMeshes.length > 0) return
        
        cameraControls.current.colliderMeshes = [floorRef.current]
    }
    return (
        <Canvas shadows camera={{position: [2.5, 1, 0], fov: 50}}>
            <Suspense fallback={null} >
                <Environment files="/hdr/warehouse-512.hdr" environmentIntensity={0.6}/>
                <directionalLight castShadow lookAt={[0, 0, 0]} position={[1, 1, 1]} intensity={1.6}/>
                <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 10]}/>
                <color attach="background" args={[ENVIRONMENT_COLOR]}/>
                <StageFloor/>
                <mesh rotation={[-Math.PI /2, 0, 0]} ref={floorRef}>
                    <planeGeometry args={[6,6]}/>
                    <meshBasicMaterial visible={false}/>
                </mesh>
                <Skateboard 
                    wheelTextureURLs={wheelTextureURLs} 
                    wheelTextureURL={wheelTextureURL} 
                    deckTextureURLs={deckTextureURLs} 
                    deckTextureURL={deckTextureURL}
                    truckColor={truckColor}
                    boltColor={boltColor}
                    pose="side"
                />
                <CameraControls 
                    ref={cameraControls} 
                    minDistance={0.2} 
                    maxDistante={4}
                    onStart={onCameraControlStart}
                />
            </Suspense>
            <Preload all/>
        </Canvas>
    )
}


function StageFloor() {
    const normalMap = useTexture("/concrete-normal.avif");
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(30,30);
    normalMap.anisotropy = 8;

    const material = new THREE.MeshStandardMaterial({
        roughness: 75,
        color: ENVIRONMENT_COLOR,
        normalMap: normalMap
    })

    return(
        <mesh
            material={material}
            receiveShadow
            position={[0, -0.005, 0]}
            rotation={[-Math.PI / 2, 0, 0]}

        >
            <circleGeometry args={[20, 32]}/>
        </mesh>
    )
}