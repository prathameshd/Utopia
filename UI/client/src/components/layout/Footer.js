import React from 'react'


export default () => {
    return(
       <footer style={{bottom:'0%',position:'relative'}} className="bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} Utopia
       </footer> 
        );
};