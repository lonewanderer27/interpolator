import Button from './Button'
import { PageContext } from '../App'
import { pageEnum } from '../enums';
import { useContext } from 'react'

function SideBar() {
    const { page, setPage } = useContext(PageContext); 

    return (
        <div className="sb">
            <div className="sb-inner">

                <div className="sb-i-up">

                    <Button variant="secondary" size="sm">
                        <i className="bi bi-calculator me-2"></i>Calculator
                    </Button>

                    <div className="d-flex justify-content-between my-3">
                        <h1 className='sb-i-up-title'>Polaris</h1>
                        <Button variant="secondary" size="sm">
                            <i className="bi bi-moon-fill"/>
                        </Button>
                    </div>

                    <p className="sb-i-up-desc">Polaris is a calculator that will determine the 
crypto exchange over time.</p>

                </div>
                
                <div className="sb-i-middle">
                    <div className="d-grid w-100">
                        <Button variant={page === pageEnum.NEWTON ? "primary" : "secondary"} onClick={() => setPage(pageEnum.NEWTON)}>
                            Newton
                        </Button>
                        <Button  variant={page === pageEnum.LAGRANGE ? "primary" : "secondary"} onClick={() => setPage(pageEnum.LAGRANGE)}>
                            Lagrange
                        </Button>
                    </div>
                </div>
                <div className="sb-i-down">
                    <div className="d-grid w-100">
                        <Button  variant={page === pageEnum.ABOUT_US ? "primary" : "secondary"} onClick={() => setPage(pageEnum.ABOUT_US)}>
                            About Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar