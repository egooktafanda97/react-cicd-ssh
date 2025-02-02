import React, { Fragment } from 'react'

interface ListGroup {
  Headertext?: string
  children?: React.ReactNode;
  CardHeader?: boolean;
  Footertext?: string;
  Listvariant?: string
  CardFooter?: boolean;
  ListClass?: string;
  Customfooterclass?: string;
}
const SpkListgroupcards: React.FC<ListGroup> = ({ Headertext, children, CardHeader = false, Footertext, CardFooter = false, Customfooterclass }) => {
  return (
    <Fragment>
      <div className="box">
            {CardHeader ?
                <div className="box-header  !text-start">
                    {Headertext}
                </div>
            :""}
            <ul className="list-group list-group-flush">
                {children}
            </ul>
            {CardFooter ?
                <div className={`box-footer ${Customfooterclass}`}>
                   {Footertext}
                </div>
            :""}
        </div>
    </Fragment>
  )
}

export default SpkListgroupcards