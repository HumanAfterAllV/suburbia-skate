"use client"

import { CameraControls, Environment, Preload } from "@react-three/drei";
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
const ENVIROMENT_COLOR = "#3B3A3A";

export default function Preview({deckTextureURLs, wheelTextureURLs}: PreviewProps): React.JSX.Element {
    
    const cameraControls =  useRef<CameraControls>(null);
    const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } = useCustomizerControls();

    const wheelTextureURL = asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
    const deckTextureURL = asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
    const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
    const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;
    
    return (
        <Canvas>
            <Suspense fallback={null} >
                <Environment files="/hdr/warehouse-512.hdr" environmentIntensity={0.6}/>
                <directionalLight castShadow lookAt={[0, 0, 0]} position={[1, 1, 1]} intensity={1.6}/>
                <Skateboard 
                    wheelTextureURLs={wheelTextureURLs} 
                    wheelTextureURL={wheelTextureURL} 
                    deckTextureURLs={deckTextureURLs} 
                    deckTextureURL={deckTextureURL}
                    truckColor={truckColor}
                    boltColor={boltColor}
                    pose="upright"
                />
                <CameraControls ref={cameraControls} minDistance={0.2} maxDistante={4}/>
            </Suspense>
            <Preload all/>
        </Canvas>
    )
}