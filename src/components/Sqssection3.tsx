import * as React from "react";
import "../index.css";

const Sqssection3 = () => {
    return (
        <>
            <div className="container1">

                <div className="textM">
                    <h1 className="texth1">Whole Home</h1>
                    <br />
                    <p className="desc-p">
                        We all have a room in our house that could use a refresh. Maybe you purchased your home before you had children and now need a family or play room. Perhaps the laundry room has become a catch-all for your storage needs and threatens to overflow. Or has your master bedroom lost its feeling of “retreat” and needs a refreshing new look?
                    </p>
                    <br />
                    <p className="desc-p"> Whether you are planning to renovate your entire home, an addition, or if you require structural work, our award-winning design team will re-imagine your home with you, to ensure that your style always shines through.</p>
                    <br/>
                    <div className="image-button-wrapper">
                        <div className="image-button sqs-dynamic-text" data-width-percentage="35.8" style={{ fontSize: "max(0.75rem, 35.8%)" }}>
                            <div className="image-button-inner">
                                <a href="#" className="sqs-button-element--primary">whole home renovations</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image" style={{marginTop:"5rem"}}>
                    <img src="https://images.squarespace-cdn.com/content/v1/5b59d2392971143f390e9391/1534799855831-647LO460VQTW3YRLHCTY/BOSTON~4.JPG?format=750w" width="611px" height="408px" id="hp" />
                </div>
            </div>

        </>
    );
}


export default Sqssection3;