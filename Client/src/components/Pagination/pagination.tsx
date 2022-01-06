import React, { Fragment } from 'react'
import '../../css/pagination.css' 
type propTypes={
    data:any,
    title:string,
    pageLimit:number,
    dataLimit:number
    RenderedComponent:any
}
type stateTypes={
    pages:number,
    currentpage:number
}
class Pagination extends React.Component<propTypes,stateTypes>{
    constructor(props:propTypes)
    {
        super(props)
        this.state={
            pages:Math.ceil(this.props.data.length / this.props.dataLimit),
            currentpage:1
        }
    }
    goToNextPage=()=>{
        this.setState({currentpage:this.state.currentpage+1})
    }
    goToPreviousPage=()=>{
        this.setState({currentpage:this.state.currentpage-1})
    }  
    changePage=(event:any)=>{
        // not yet implemented
        const pageNumber = Number(event.target.textContent);
        this.setState({currentpage:pageNumber})
    }
    getPaginatedData = () => {
        const startIndex = this.state.currentpage * this.props.dataLimit - this.props.dataLimit;
        const endIndex = startIndex + this.props.dataLimit;
        const arr= this.props.data.slice(startIndex, endIndex);
        return arr
    };
    getPaginationGroup = () => {
        // not yet implemented
        let start = Math.floor((this.state.currentpage - 1) / this.props.pageLimit) *this.props.pageLimit;
        if(start>=this.state.pages-1)
        {
            return []
        }
        var array= Array.from({length:Math.min(this.state.pages,this.props.pageLimit)}, (_, i) => start+i + 1)
        return array
    };
    render(){
        return(
            <Fragment>
                <this.props.RenderedComponent data={this.getPaginatedData()}/>
                {this.getPaginatedData().length>4&&
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${this.state.currentpage === 1 ? 'disabled' : ''}`}>
                  <a className="page-link" onClick={this.goToPreviousPage} aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                </li>
                {this.getPaginationGroup().map((item, index) => (
                          <li key={index} 
                          onClick={this.changePage}
                          className={`page-item ${this.state.currentpage === item ? 'active' : null}`}>
                            <a className="page-link"><span>{item}</span></a>
                          </li>
                        ))}
                <li className={`page-item ${this.state.currentpage === this.state.pages ? 'disabled' : ''}`}>
                  <a className="page-link" onClick={this.goToNextPage} aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                </li>
              </ul>
            </nav>
            }
          </Fragment>
        )
    }
}
export default Pagination