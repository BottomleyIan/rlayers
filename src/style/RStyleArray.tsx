import React from 'react';
import ReactDOM from 'react-dom';
import {Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';

import {RContext, RContextType} from '../context';
import {default as RStyle, RStyleProps, RStyleRef} from './RStyle';
import debug from '../debug';
import Geometry from 'ol/geom/Geometry';

/** An array of RStyle, can be an RStyle of its own
 * - this represents the OpenLayers concept of a style array
 *
 * It replaces the references on its children, so individual elements
 * in the array cannot be referenced
 *
 * It doesn't support caching yet
 *
 * Every style in the array must be a static style and not a function
 *
 * Arrays of style functions are not supported by OpenLayers and won't
 * be supported rlayers either
 */
export default class RStyleArray extends RStyle {
    constructor(props: Readonly<RStyleProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.childRefs = [];
        if (props.render) this.ol = this.style;
        else this.ol = [];
    }

    style = (f: Feature<Geometry>, r: number): Style | Style[] => {
        if (this.props.render) {
            const element = this.props.render(f, r);
            const styleArray = [];
            const render = (
                <RContext.Provider value={{...this.context, styleArray}}>
                    {React.Children.map(element.props.children as React.ReactNode, (child, i) => {
                        if (!this.childRefs[i]) this.childRefs[i] = React.createRef();
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        if (React.isValidElement(child) && (child.type as Function) === RStyle) {
                            return React.cloneElement(child, {
                                ref: this.childRefs[i]
                            });
                        }
                        throw new TypeError('An RStyleArray should contain only RStyle elements');
                    })}
                </RContext.Provider>
            );
            ReactDOM.render(render, document.createElement('div'));
            return styleArray as Style[];
        }
        return this.ol as Style[];
    };

    refresh(prevProps?: RStyleProps): void {
        super.refresh(prevProps);
        if (!this.props.render)
            this.ol = this.childRefs.map((child) => RStyle.getStyleStatic(child));
    }

    render(): JSX.Element {
        if (!this.props.render)
            return (
                <RContext.Provider value={{...this.context, styleArray: this.ol as Style[]}}>
                    {React.Children.map(this.props.children, (child, i) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        if (React.isValidElement(child) && (child.type as Function) === RStyle) {
                            if (!this.childRefs[i]) this.childRefs[i] = React.createRef();
                            return React.cloneElement(child, {ref: this.childRefs[i]});
                        }
                        throw new TypeError('An RStyleArray should contain only RStyle elements');
                    })}
                </RContext.Provider>
            );
        return <React.Fragment />;
    }
}
