import * as React from "react";
import "../index.css";


const Sqssection = (section : any) => {

    return (
        <>
        
            <div className="container1">

                <div className="textM">
                    <h1 className="texth1">{section.c_imageBanner.bannerHeading}</h1>
                    <br />
                    <p className="desc-p">
                        Old World charm? Sleek and modern? Classic with a contemporary twist? What style speaks to you when you re-imagine your kitchen? These are just a few of the questions that spark the remodeling process.
                        Do  you need more storage space? Or want to open up the kitchen to the rest of the house and create the feeling of a larger floor plan? Is your kitchen simply tired and doesn’t reflect your family’s style? Would a light-filled space make it easier to prepare and share meals with your family?
                    </p>
                    <br />
                    <p className="desc-p"> With the design+build process, <em>it’s easier than you think to achieve the kitchen you deserve. Explore some of the kitchens our award-winning team has designed and built for our customers below.</em></p>
                    <br />
                    <p className="desc-p"><em>Be inspired. Find your style.&nbsp;</em></p>
                    <br />
                    <div className="image-button-wrapper">
                        <div className="image-button sqs-dynamic-text" data-width-percentage="35.8" style={{ fontSize: "max(0.75rem, 35.8%)" }}>
                            <div className="image-button-inner">
                                <a href="#" className="sqs-button-element--primary">{section.c_imageBanner.buttonB.label}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image">
                    <img src={section.c_imageBanner.b_Image.url} width="611px" height="408px" id="hp" />
                </div>
            </div>

        </>
    );
}


export default Sqssection;