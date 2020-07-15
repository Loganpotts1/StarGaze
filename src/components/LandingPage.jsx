import React, { Suspense } from "react";
import Spinner from "./Spinner";




export default function LandingPage() {
    const Content = React.lazy(() => import("./LandingPageContent.jsx"));

    return (    
        <Suspense fallback={<Spinner/>}>
            <Content />
        </Suspense>
    );
}