import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { MapContainer, ImageOverlay, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import {Typography} from "@mui/material";

interface MarkerProps {
    position: [number, number];
    content: string;
}

/**
 * 座席管理ホーム画面
 * @param auth
 * @constructor
 */
const Home: React.FC<PageProps> = ({ auth }) => {

    const url = 'https://placehold.jp/1980x1080.png';

    const imageBounds: L.LatLngBoundsExpression = [[0, 0], [1080, 1980]]; // 画像の矩形領域を指定する
    const imageOptions = { opacity: 1 }; // 画像に適用するオプションを指定する
    const pinIcon = L.icon({ // ピンのアイコンを作成する
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });

    const markers: MarkerProps[] = [
        {
            position: [500, 500],
            content: '<b>ここはAフロアです</b>',
        },
        {
            position: [700, 300],
            content: '<b>ここはBフロアです</b>',
        },
    ];

    const markerList = markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={pinIcon}>
            <Tooltip>{marker.content}</Tooltip>
            <Popup>{marker.content}</Popup>
        </Marker>
    ));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Typography variant="h6" className="text-2xl font-bold">フロアマップ</Typography>
            }
        >
            <Head title="座席管理" />
            <MapContainer
                center={[0, 0]}
                zoom={0}
                minZoom={0}
                maxZoom={0}
                scrollWheelZoom={false}>
                <ImageOverlay url={url} bounds={imageBounds} opacity={imageOptions.opacity} />
                {markerList}
            </MapContainer>
        </AuthenticatedLayout>
    );
};

export default Home;
