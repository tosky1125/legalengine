// import React, { useState } from 'react';
// import SearchBar from '../SearchBar';
// import { connect } from 'react-redux';
// import axios from 'axios';
// import Pagination from '../Pagination';
// import * as searchlist from '../../modules/searchlist';
// import { withRouter } from 'react-router-dom';
// import * as lawinfo from '../../modules/lawinfo';
// import './SearchResult.css';
// import { format } from 'date-fns';

// function SR(props) {
//   const [pageOfItems, setpageOfItems] = useState([]);
//   const [isLoaded, setisLoaded] = useState(false);
//   const { lawlist } = props;

//   const onChangePage = (pageOfItems) => {
//     setpageOfItems({ pageOfItems });
//     console.log(pageOfItems);
//   };

//   console.log(pageOfItems);
//   const pagedate = () => {
//     console.log(pageOfItems);
//     pageOfItems.map((item, index) => (
//       <div
//         to='/view'
//         target='_blank'
//         className='page'
//         key={index}
//         onClick={() =>
//           handleClickSearch(item.name, item.number, item.enforcement_date)
//         }
//       >
//         <h3 className='name'>{item.name}</h3>

//         <span className='type'>{item.type}&nbsp;</span>
//         <span className='number'>{item.number}호&nbsp;</span>
//         <span className='admendment'>{item.amendment_status}&nbsp;</span>
//         <span className='ministry'>{item.ministry}&nbsp;</span>
//         <span className='promulgation'>
//           공포일자 : {format(new Date(item.promulgation_date), 'yyyy.MM.dd')}
//           &nbsp;
//         </span>
//         <span className='enforcement'>
//           시행일자 : {format(new Date(item.enforcement_date), 'yyyy.MM.dd')}
//         </span>
//       </div>
//     ));
//   };

//   const handleClickSearch = (name, number, enforcement_date) => {
//     const { lawinfo } = props;

//     axios
//       .get(
//         `http://13.125.112.243/search?lawName=${name}&lawNum=${number}&enfDate=${enforcement_date}`
//       )
//       .then((res) => {
//         lawinfo(res.data);
//         console.log(res.data);
//         localStorage.Law = JSON.stringify(res.data.Law);
//         localStorage.related = JSON.stringify(res.data.related);
//         setisLoaded(true);
//       })
//       .then(() => {
//         window.open(
//           `/view?lawName=${name}&lawNum=${number}&enfDate=${format(
//             new Date(enforcement_date),
//             'yyyy-MM-dd'
//           )}`,
//           '_blank'
//         );
//       })
//       .catch((err) => {
//         if (err.res) {
//           console.log(err.res.data);
//           console.log(err.res.status);
//           console.log(err.res.headers);
//         } else if (err.req) {
//           console.log(err.req);
//         } else {
//           console.log('Error', err.message);
//         }
//         console.log(err.config);
//       });
//   };

//   if (lawlist.length === 0) {
//     return (
//       <div>
//         <SearchBar />
//         <div className='search-empty'>검색 결과가 없습니다.</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className='container'>
//         <SearchBar />
//         <div className='law-number'>총 {lawlist.length} 건의 결과</div>
//         <div className='page-list text-center'>
//           {pagedate()}
//           {/* {() => {
//             alert(pageOfItems);
//             pageOfItems.map((item, index) => (
//               <div
//                 to='/view'
//                 target='_blank'
//                 className='page'
//                 key={index}
//                 onClick={() =>
//                   handleClickSearch(
//                     item.name,
//                     item.number,
//                     item.enforcement_date
//                   )
//                 }
//               >
//                 <h3 className='name'>{item.name}</h3>

//                 <span className='type'>{item.type}&nbsp;</span>
//                 <span className='number'>{item.number}호&nbsp;</span>
//                 <span className='admendment'>
//                   {item.amendment_status}&nbsp;
//                 </span>
//                 <span className='ministry'>{item.ministry}&nbsp;</span>
//                 <span className='promulgation'>
//                   공포일자 :{' '}
//                   {format(new Date(item.promulgation_date), 'yyyy.MM.dd')}&nbsp;
//                 </span>
//                 <span className='enforcement'>
//                   시행일자 :{' '}
//                   {format(new Date(item.enforcement_date), 'yyyy.MM.dd')}
//                 </span>
//               </div>
//             ));
//           }} */}
//           <div>
//             <Pagination items={lawlist} onChangePage={onChangePage} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default connect(
//   (state) => ({
//     lawlist: state.searchlist.lawlist,
//     lawDetail: state.lawinfo.lawDetail,
//   }),
//   (dispatch) => ({
//     searchlist: (data) => dispatch(searchlist.searchlist(data)),
//     lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
//   })
// )(withRouter(SR));
