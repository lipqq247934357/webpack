import React from 'react';
import  Sliders from './Sliders';
const RemoteNewsList = React.lazy(()=>import('remoteZZZ/NewsList'));
const App = ()=>{
    return (
        <div>
            <h2>本地组件Sliders</h2>
            <Sliders/>
            <h2>远程组件NewsList</h2>
            <React.Suspense fallback={<div>加载远程组件中...</div>}>
                <RemoteNewsList/>
            </React.Suspense>
        </div>
    )
}
export default App;