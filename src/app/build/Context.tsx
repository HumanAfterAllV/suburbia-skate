"use client"

import { Content } from "@prismicio/client"
import { createContext, useContext, useMemo, useState } from "react"

type CustomizerControlsContext = {
    selectedWheel? : Content.BoardCustomizerDocumentDataWheelsItem;
    setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
    selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
    setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
    selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
    setTruck: (metal: Content.BoardCustomizerDocumentDataMetalsItem) => void;
    selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
    setBolt: (bolt: Content.BoardCustomizerDocumentDataMetalsItem) => void;
}

const defaultContext: CustomizerControlsContext = {
    setWheel: () => {},
    setDeck: () => {},
    setTruck: () => {},
    setBolt: () => {},
}

const CustomizerControlsContext = createContext<CustomizerControlsContext>(defaultContext)



type CustimizerControlsProviderProps = {
    children?: React.ReactNode;
    defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
    defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
    defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
    defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
}


export default function CustomizerControlsProvider({children, defaultWheel, defaultDeck, defaultTruck, defaultBolt}: CustimizerControlsProviderProps): React.JSX.Element {

    const [selectedWheel, setWheel] = useState(defaultWheel);
    const [selectedDeck, setDeck] = useState(defaultDeck);
    const [selectedTruck, setTruck] = useState(defaultTruck);
    const [selectedBolt, setBolt] = useState(defaultBolt);

    const value = useMemo<CustomizerControlsContext>(() => {
        return {
            selectedWheel, 
            setWheel,
            selectedDeck,
            setDeck,
            selectedTruck,
            setTruck,
            selectedBolt,
            setBolt,
        }
    }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt])

    return (
        <CustomizerControlsContext.Provider value={value}>
            {children}
        </CustomizerControlsContext.Provider>
    )
}


export function useCustomizerControls() {
    return useContext(CustomizerControlsContext)
}