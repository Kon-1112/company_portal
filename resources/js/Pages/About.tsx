import React from "react";
import {Link} from "@inertiajs/react";
import {ImageOverlay, MapContainer} from "react-leaflet";
import L from "leaflet";

const About = () => {

    const url = 'https://placehold.jp/1980x1080.png';

    const imageBounds: L.LatLngBoundsExpression = [[0, 0], [1080, 1980]]; // 画像の矩形領域を指定する

    const imageOptions = { opacity: 1 }; // 画像に適用するオプションを指定する

    return (
        <div>
        <h1>ようこそCompanyPortalへ</h1>
            <Link href={"/"}>d</Link>
            <br/>
            <Link href={"/about"}>about</Link>
            <MapContainer
                center={[0, 0]}
                zoom={0}
                minZoom={0}
                maxZoom={0}
                scrollWheelZoom={false}>
                <ImageOverlay url={url} bounds={imageBounds} opacity={imageOptions.opacity} />
            </MapContainer>
        </div>
    );
}

export default About;
