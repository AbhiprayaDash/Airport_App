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
        this.goToNextPage = this.goToNextPage.bind(this)
        this.goToPreviousPage = this.goToPreviousPage.bind(this)
        this.changePage = this.changePage.bind(this)
        this.getPaginatedData = this.getPaginatedData.bind(this)
        this.getPaginationGroup = this.getPaginationGroup.bind(this)
    }
    goToNextPage() {
        this.setState({currentpage:this.state.currentpage+1})
    }
    goToPreviousPage() {
        this.setState({currentpage:this.state.currentpage-1})
    }
   
    changePage(event:any) {
        // not yet implemented
        const pageNumber = Number(event.target.textContent);
        this.setState({currentpage:pageNumber})
    }
   
    getPaginatedData = () => {
        const startIndex = this.state.currentpage * this.props.dataLimit - this.props.dataLimit;
        const endIndex = startIndex + this.props.dataLimit;
        const arr= this.props.data.slice(startIndex, endIndex);
        console.log(arr.length)
        console.log(arr)
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
        console.log(array)
        return array
    };
    render(){
        return(
            <Fragment>
                <this.props.RenderedComponent data={this.getPaginatedData()}/>
            <div className="pagination">
            {/* previous button */}
            <button
              onClick={this.goToPreviousPage}
              className={`prev ${this.state.currentpage === 1 ? 'disabled' : ''}`}
            >
              prev
            </button>
      
            {/* show page numbers */}
            {this.getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={this.changePage}
                className={`paginationItem ${this.state.currentpage === item ? 'active' : null}`}
              >
                <span>{item}</span>
              </button>
            ))}
      
            {/* next button */}
            <button
              onClick={this.goToNextPage}
              className={`next ${this.state.currentpage === this.state.pages ? 'disabled' : ''}`}
            >
              next
            </button>
          </div>
          </Fragment>
        )
    }
}
export default Pagination