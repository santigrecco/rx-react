import React from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


export const RxSync = (observable) => {


   return (WrappedComponent) => {

      return class extends React.Component {

         constructor(props) {
            super(props);
            this.unsubscribe = new Subject();
            this.state = {
               data: null
            }
         }

         componentDidMount() {
            observable
               .pipe(
                  takeUntil(this.unsubscribe)
               )
               .subscribe(data => {
                  this.setState({
                     data
                  })
               })

         }

         render() {
            return <WrappedComponent {...this.state} />
         }

         componentWillUnmount() {
            this.unsubscribe.next();
            this.unsubscribe.complete();
         }
      }
   }
}