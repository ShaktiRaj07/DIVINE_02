import { Fragment, useState } from "react";
import * as React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import "../index.css";

export default function FAQ(faqdata: any) {
  // console.log('faqdata', faqdata)
  const [open, setOpen] = useState(0);

  const

    handleOpen = (value: any) => {
      setOpen(open === value ? 0 : value);
    };
  return (

    <div className="container4.0">
      <h2 className="title">Frequently Asked Questions</h2>
      <div className="accordian">
        <Fragment>
          {
            faqdata.faqs.map((value: any, index: any) => {
              return (
                <Accordion open={open === index + 1}>
                  <AccordionHeader onClick={() => handleOpen(index + 1)} className="add">
                  {value.question} 
                  </AccordionHeader>
                  <AccordionBody className="accordian answer-field">
                  <span>&#9830;</span> {value.answer}
                  </AccordionBody>
                </Accordion>
              )
            }
            )
          }
        </Fragment>
      </div>
    </div>
  );
}


