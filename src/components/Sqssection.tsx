import * as React from "react";
import "../index.css";

const Sqssection = () => {
    return (
        <>
            <div className="container1">

                <div className="textM">
                    <h1 className="texth1">Kitchens</h1>
                    <br/>
                    <p className="desc-p">
                        Old World charm? Sleek and modern? Classic with a contemporary twist? What style speaks to you when you re-imagine your kitchen? These are just a few of the questions that spark the remodeling process.
                        Do  you need more storage space? Or want to open up the kitchen to the rest of the house and create the feeling of a larger floor plan? Is your kitchen simply tired and doesn’t reflect your family’s style? Would a light-filled space make it easier to prepare and share meals with your family?
                    </p>
                    <br/>
                    <p className="desc-p"> With the design+build process, <em>it’s easier than you think to achieve the kitchen you deserve. Explore some of the kitchens our award-winning team has designed and built for our customers below.</em></p>
                    <br/>
                    <p className="desc-p"><em>Be inspired. Find your style.&nbsp;</em></p>
                    <br/>
                    <div className="image-button-wrapper">
                        <div className="image-button sqs-dynamic-text" data-width-percentage="35.8" style={{ fontSize: "max(0.75rem, 35.8%)" }}>
                            <div className="image-button-inner">
                                <a href="#" className="sqs-button-element--primary">award winning kitchens</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image">
                    <img src="https://images.squarespace-cdn.com/content/v1/5b59d2392971143f390e9391/1534801537843-V59G48EHVKMQI0JZNIL1/CAD000~1.JPG?format=750w" width="611px" height="408px" id="hp" />
                </div>
            </div>

        </>
    );
}


export default Sqssection;