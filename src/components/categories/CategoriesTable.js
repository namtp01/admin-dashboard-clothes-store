import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, listCategories } from "../../redux/actions/CategoryActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const CategoriesTable = () =>
{
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.categoryList)
  const { loading, error, categories = [] } = categoryList || {}

  useEffect(() =>
  {
    dispatch(listCategories())

  }, [dispatch])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteCategory(id))
    }
  }

  // Group categories by their parent field
  const groupedCategories = categories.reduce((acc, category) => {
    if (category.parent) {
      if (!acc[category.parent]) {
        acc[category.parent] = [];
      }
      acc[category.parent].push(category);
    } else {
      if (!acc[category._id]) {
        acc[category._id] = [];
      }
    }
    return acc;
  }, {});

  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            {/* <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th> */}
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {
            loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
              Object.entries(groupedCategories).map(([parentId, childCategories], index) => {
                const parentCategory = categories.find(category => category._id === parentId);
                return (
                  <React.Fragment key={parentId}>
                    {/* Render parent category */}
                    <tr>
                      {/* <td>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" />
                        </div>
                      </td> */}
                      <td>{index + 1}</td>
                      <td><b>{parentCategory.name}</b></td>
                      <td></td>
                      <td className="text-end">
                        <div className="dropdown">
                          <Link
                            to="#"
                            data-bs-toggle="dropdown"
                            className="btn btn-light"
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Link>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to={`/category/${parentCategory._id}/edit`}>
                              Edit info
                            </Link>
                            <Link className="dropdown-item text-danger" to="#" onClick={() => deleteHandler(parentCategory._id)}>
                              Delete
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Render child categories */}
                    {childCategories.map((category, index) => (
                      <tr key={category._id}>
                        <td></td>
                        <td></td>
                        <td>{category.name}</td>
                        <td></td>
                        <td className="text-end">
                          <div className="dropdown">
                            <Link
                              to="#"
                              data-bs-toggle="dropdown"
                              className="btn btn-light"
                            >
                              <i className="fas fa-ellipsis-h"></i>
                            </Link>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item" to={`/category/${category._id}/edit`}>
                                Edit info
                              </Link>
                              <Link className="dropdown-item text-danger" to="#" onClick={() => deleteHandler(category._id)}>
                                Delete
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>  
                    ))}
                  </React.Fragment>  
                );
              })
            )
          }
        </tbody>
      </table> 
    </div> 
  );
};

export default CategoriesTable;

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { listCategories } from "../../Redux/Actions/CategoryActions";
// import Loading from "../LoadingError/Loading";
// import Message from "../LoadingError/Error";

// const CategoriesTable = () =>
// {
//   const dispatch = useDispatch()
//   const categoryList = useSelector(state => state.categoryList)
//   const { loading, error, categories } = categoryList

//   useEffect(() =>
//   {
//     dispatch(listCategories())

//   }, [dispatch])
//   return (
//     <div className="col-md-12 col-lg-8">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" value="" />
//               </div>
//             </th>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th className="text-end">Action</th>
//           </tr>
//         </thead>
//         {/* Table Data */}
//         <tbody>
//           {
//             loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
//               categories.map((category) => (
//                 <tr key={category._id}>
//                   <td>
//                     <div className="form-check">
//                       <input className="form-check-input" type="checkbox" value="" />
//                     </div>
//                   </td>
//                   <td>1</td>
//                   <td>
//                     <b>{category.name}</b>
//                   </td>
//                   <td>{category.parent}</td>
//                   <td className="text-end">
//                     <div className="dropdown">
//                       <Link
//                         to="#"
//                         data-bs-toggle="dropdown"
//                         className="btn btn-light"
//                       >
//                         <i className="fas fa-ellipsis-h"></i>
//                       </Link>
//                       <div className="dropdown-menu">
//                         <Link className="dropdown-item" to="#">
//                           Edit info
//                         </Link>
//                         <Link className="dropdown-item text-danger" to="#">
//                           Delete
//                         </Link>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )
//           }
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CategoriesTable;
