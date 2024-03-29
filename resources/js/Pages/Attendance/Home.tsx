import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {PageProps} from "@/types";

/**
 * 勤怠管理ホーム画面
 * @param auth
 * @constructor
 */
export default function Home({ auth }: PageProps): JSX.Element {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    勤怠管理
                </h2>}
        >
            <Head title="人事評価管理" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">(未実装)</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
