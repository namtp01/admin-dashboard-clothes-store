import React from 'react'
import EditCategory from '../components/categories/EditCategory'
import Header from './../components/Header'
import Sidebar from './../components/Sidebar'
import { useParams } from 'react-router-dom'

const CategoriesEditScreen = ({ match }) =>
{
    //const categoryId = match.params.id
    const categoryId = useParams()
    return (
        <>
            <Sidebar />
            <main className='main-wrap'>
                <Header />
                <EditCategory categoryId={categoryId} />
            </main>
        </>
    )
}

export default CategoriesEditScreen
