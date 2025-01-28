import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import CustomizerControlsProvider from "./Context";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import Preview from "./Preview";
import Control from "./Control";


type SearchParams = {
    deck?: string;
    wheel?: string;
    truck?: string;
    bolt?: string;
}

export default async function Page(props: {searchParams: Promise<SearchParams>}): Promise<React.JSX.Element> {

    const searchParams = await props.searchParams;

    const client = createClient();
    const customizerSetting = await client.getSingle("board_customizer")
    const { wheels, decks, metals } = customizerSetting.data;

    const defaultWheel = wheels.find((wheel) => wheel.uid === searchParams.wheel) ?? wheels[0];
    const defaultDeck = decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0];
    const defaultTruck = metals.find((metal) => metal.uid === searchParams.truck) ?? metals[0];
    const defaultBolt = metals.find((metal) => metal.uid === searchParams.bolt) ?? metals[0];

    const wheelTextureURLs = wheels.map((texture) => asImageSrc(texture.texture)).filter((url): url is string => Boolean(url) );
    const deckTextureURLs = decks.map((texture) => asImageSrc(texture.texture)).filter((url): url is string => Boolean(url) );

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <CustomizerControlsProvider defaultWheel={defaultWheel} defaultDeck={defaultDeck} defaultTruck={defaultTruck} defaultBolt={defaultBolt}>
                <div className="relative aspect-square shrink-0 bg-[#3A414A] lg:aspect-auto lg:grow">
                    <div className="absolute inset-0">
                        <Preview wheelTextureURLs={wheelTextureURLs} deckTextureURLs={deckTextureURLs}/>
                    </div>
                    <Link href="/" className="absolute left-6 top-6">
                        <Logo className="h-12 text-white"/>
                    </Link>
                </div>  
                <div className="grow bg-texture bg-zinc-600 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
                    <Heading as="h1" size="sm" className="mb-6 mt-0">
                        Build Your Board
                    </Heading>
                    <Control
                        wheels={wheels}
                        decks={decks}
                        metals={metals}
                        className="mb-6"
                    />  
                    <ButtonLink href="" color="lime" icon="plus">
                        Add to Cart
                    </ButtonLink>
                </div>
            </CustomizerControlsProvider>
        </div>
    )
}


