"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Billboard } from "@react-three/drei";

interface HotSpotProps {
    position: [number, number, number];
    isVisible: boolean;
    color?: string;
}

export default function HotSpot({position, isVisible, color="#E6FC6E"}: HotSpotProps): React.JSX.Element{

    const hotspotRef = useRef<THREE.Mesh>(null);

    return(
        <Billboard position={position} follow={true} scale={0.1} onPointerOver={document.body.style.cursor == "pointer"} onPointerOut={document.body.style.cursor == "default"}>
            <mesh ref={hotspotRef} visible={isVisible}>
                <circleGeometry args={[0.2, 32]}/>
                <meshStandardMaterial color={color} transparent opacity={1}/>
            </mesh>
        </Billboard>
    )
}