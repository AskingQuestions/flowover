import type {
	HTMLAttributes,
	HTMLAnchorAttributes,
	HTMLAudioAttributes,
	HTMLAreaAttributes,
	HTMLBaseAttributes,
	HTMLBlockquoteAttributes,
	HTMLButtonAttributes,
	HTMLCanvasAttributes,
	HTMLColAttributes,
	HTMLColgroupAttributes,
	HTMLDataAttributes,
	HTMLDetailsAttributes,
	HTMLDelAttributes,
	HTMLDialogAttributes,
	HTMLEmbedAttributes,
	HTMLFieldsetAttributes,
	HTMLFormAttributes,
	HTMLHtmlAttributes,
	HTMLIframeAttributes,
	HTMLImgAttributes,
	HTMLInsAttributes,
	HTMLInputAttributes,
	HTMLKeygenAttributes,
	HTMLLabelAttributes,
	HTMLLiAttributes,
	HTMLLinkAttributes,
	HTMLMapAttributes,
	HTMLMenuAttributes,
	HTMLMetaAttributes,
	HTMLMeterAttributes,
	HTMLQuoteAttributes,
	HTMLObjectAttributes,
	HTMLOlAttributes,
	HTMLOptgroupAttributes,
	HTMLOptionAttributes,
	HTMLOutputAttributes,
	HTMLParamAttributes,
	HTMLProgressAttributes,
	HTMLSlotAttributes,
	HTMLScriptAttributes,
	HTMLSelectAttributes,
	HTMLSourceAttributes,
	HTMLStyleAttributes,
	HTMLTableAttributes,
	HTMLTextareaAttributes,
	HTMLTdAttributes,
	HTMLThAttributes,
	HTMLTimeAttributes,
	HTMLTrackAttributes,
	HTMLVideoAttributes,
	SvelteMediaTimeRange,
	SvelteDocumentAttributes,
	SvelteWindowAttributes,
	SVGAttributes,
	HTMLWebViewAttributes
} from 'svelte/elements';

export type ProxyElement =
	| (HTMLAttributes<HTMLDivElement> & { this?: undefined })
	| (HTMLButtonAttributes & {
			this: 'button';
	  })
	| (HTMLAttributes<HTMLDivElement> & {
			this: 'div';
	  })
	| (HTMLAnchorAttributes & { this: 'anchor' })
	| (HTMLAudioAttributes & { this: 'audio' })
	| (HTMLAreaAttributes & { this: 'area' })
	| (HTMLBaseAttributes & { this: 'base' })
	| (HTMLBlockquoteAttributes & { this: 'blockquote' })
	| (HTMLButtonAttributes & { this: 'button' })
	| (HTMLCanvasAttributes & { this: 'canvas' })
	| (HTMLColAttributes & { this: 'col' })
	| (HTMLColgroupAttributes & { this: 'colgroup' })
	| (HTMLDataAttributes & { this: 'data' })
	| (HTMLDetailsAttributes & { this: 'details' })
	| (HTMLDelAttributes & { this: 'del' })
	| (HTMLDialogAttributes & { this: 'dialog' })
	| (HTMLEmbedAttributes & { this: 'embed' })
	| (HTMLFieldsetAttributes & { this: 'fieldset' })
	| (HTMLFormAttributes & { this: 'form' })
	| (HTMLHtmlAttributes & { this: 'html' })
	| (HTMLIframeAttributes & { this: 'iframe' })
	| (HTMLImgAttributes & { this: 'img' })
	| (HTMLInsAttributes & { this: 'ins' })
	| (HTMLInputAttributes & { this: 'input' })
	| (HTMLKeygenAttributes & { this: 'keygen' })
	| (HTMLLabelAttributes & { this: 'label' })
	| (HTMLLiAttributes & { this: 'li' })
	| (HTMLLinkAttributes & { this: 'link' })
	| (HTMLMapAttributes & { this: 'map' })
	| (HTMLMenuAttributes & { this: 'menu' })
	| (HTMLMetaAttributes & { this: 'meta' })
	| (HTMLMeterAttributes & { this: 'meter' })
	| (HTMLQuoteAttributes & { this: 'quote' })
	| (HTMLObjectAttributes & { this: 'object' })
	| (HTMLOlAttributes & { this: 'ol' })
	| (HTMLOptgroupAttributes & { this: 'optgroup' })
	| (HTMLOptionAttributes & { this: 'option' })
	| (HTMLOutputAttributes & { this: 'output' })
	| (HTMLParamAttributes & { this: 'param' })
	| (HTMLProgressAttributes & { this: 'progress' })
	| (HTMLSlotAttributes & { this: 'slot' })
	| (HTMLScriptAttributes & { this: 'script' })
	| (HTMLSelectAttributes & { this: 'select' })
	| (HTMLSourceAttributes & { this: 'source' })
	| (HTMLStyleAttributes & { this: 'style' })
	| (HTMLTableAttributes & { this: 'table' })
	| (HTMLTextareaAttributes & { this: 'textarea' })
	| (HTMLTdAttributes & { this: 'td' })
	| (HTMLThAttributes & { this: 'th' })
	| (HTMLTimeAttributes & { this: 'time' })
	| (HTMLTrackAttributes & { this: 'track' })
	| (HTMLVideoAttributes & { this: 'video' })
	| (SvelteMediaTimeRange & { this: 'temedi' })
	| (SvelteDocumentAttributes & { this: 'tedocument' })
	| (SvelteWindowAttributes & { this: 'tewindow' })
	| (HTMLWebViewAttributes & { this: 'webview' })
	| (SVGAttributes<SVGAnimateElement> & { this: 'animate' })
	| (SVGAttributes<SVGElement> & { this: 'animateMotion' })
	| (SVGAttributes<SVGAnimateTransformElement> & { this: 'animateTransform' })
	| (SVGAttributes<SVGCircleElement> & { this: 'circle' })
	| (SVGAttributes<SVGClipPathElement> & { this: 'clipPath' })
	| (SVGAttributes<SVGDefsElement> & { this: 'defs' })
	| (SVGAttributes<SVGDescElement> & { this: 'desc' })
	| (SVGAttributes<SVGEllipseElement> & { this: 'ellipse' })
	| (SVGAttributes<SVGFEBlendElement> & { this: 'feBlend' })
	| (SVGAttributes<SVGFEColorMatrixElement> & { this: 'feColorMatrix' })
	| (SVGAttributes<SVGFEComponentTransferElement> & { this: 'feComponentTransfer' })
	| (SVGAttributes<SVGFECompositeElement> & { this: 'feComposite' })
	| (SVGAttributes<SVGFEConvolveMatrixElement> & { this: 'feConvolveMatrix' })
	| (SVGAttributes<SVGFEDiffuseLightingElement> & { this: 'feDiffuseLighting' })
	| (SVGAttributes<SVGFEDisplacementMapElement> & { this: 'feDisplacementMap' })
	| (SVGAttributes<SVGFEDistantLightElement> & { this: 'feDistantLight' })
	| (SVGAttributes<SVGFEDropShadowElement> & { this: 'feDropShadow' })
	| (SVGAttributes<SVGFEFloodElement> & { this: 'feFlood' })
	| (SVGAttributes<SVGFEFuncAElement> & { this: 'feFuncA' })
	| (SVGAttributes<SVGFEFuncBElement> & { this: 'feFuncB' })
	| (SVGAttributes<SVGFEFuncGElement> & { this: 'feFuncG' })
	| (SVGAttributes<SVGFEFuncRElement> & { this: 'feFuncR' })
	| (SVGAttributes<SVGFEGaussianBlurElement> & { this: 'feGaussianBlur' })
	| (SVGAttributes<SVGFEImageElement> & { this: 'feImage' })
	| (SVGAttributes<SVGFEMergeElement> & { this: 'feMerge' })
	| (SVGAttributes<SVGFEMergeNodeElement> & { this: 'feMergeNode' })
	| (SVGAttributes<SVGFEMorphologyElement> & { this: 'feMorphology' })
	| (SVGAttributes<SVGFEOffsetElement> & { this: 'feOffset' })
	| (SVGAttributes<SVGFEPointLightElement> & { this: 'fePointLight' })
	| (SVGAttributes<SVGFESpecularLightingElement> & { this: 'feSpecularLighting' })
	| (SVGAttributes<SVGFESpotLightElement> & { this: 'feSpotLight' })
	| (SVGAttributes<SVGFETileElement> & { this: 'feTile' })
	| (SVGAttributes<SVGFETurbulenceElement> & { this: 'feTurbulence' })
	| (SVGAttributes<SVGFilterElement> & { this: 'filter' })
	| (SVGAttributes<SVGForeignObjectElement> & { this: 'foreignObject' })
	| (SVGAttributes<SVGGElement> & { this: 'g' })
	| (SVGAttributes<SVGImageElement> & { this: 'image' })
	| (SVGAttributes<SVGLineElement> & { this: 'line' })
	| (SVGAttributes<SVGLinearGradientElement> & { this: 'linearGradient' })
	| (SVGAttributes<SVGMarkerElement> & { this: 'marker' })
	| (SVGAttributes<SVGMaskElement> & { this: 'mask' })
	| (SVGAttributes<SVGMetadataElement> & { this: 'metadata' })
	| (SVGAttributes<SVGElement> & { this: 'mpath' })
	| (SVGAttributes<SVGPathElement> & { this: 'path' })
	| (SVGAttributes<SVGPatternElement> & { this: 'pattern' })
	| (SVGAttributes<SVGPolygonElement> & { this: 'polygon' })
	| (SVGAttributes<SVGPolylineElement> & { this: 'polyline' })
	| (SVGAttributes<SVGRadialGradientElement> & { this: 'radialGradient' })
	| (SVGAttributes<SVGRectElement> & { this: 'rect' })
	| (SVGAttributes<SVGStopElement> & { this: 'stop' })
	| (SVGAttributes<SVGSwitchElement> & { this: 'switch' })
	| (SVGAttributes<SVGSymbolElement> & { this: 'symbol' })
	| (SVGAttributes<SVGTextElement> & { this: 'text' })
	| (SVGAttributes<SVGTextPathElement> & { this: 'textPath' })
	| (SVGAttributes<SVGTSpanElement> & { this: 'tspan' })
	| (SVGAttributes<SVGUseElement> & { this: 'use' })
	| (SVGAttributes<SVGViewElement> & { this: 'view' });
