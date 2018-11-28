(function(blocks, i18n, element) {
    var el = element.createElement;
    var children = blocks.source.children;
    var BlockControls = wp.blocks.BlockControls;
    var AlignmentToolbar = wp.blocks.AlignmentToolbar;
    var MediaUpload = wp.blocks.MediaUpload;
    var InspectorControls = wp.blocks.InspectorControls;
    var TextControl = wp.blocks.InspectorControls.TextControl;
    var SelectControl = wp.blocks.InspectorControls.SelectControl;

    blocks.registerBlockType('jmadblocks/feature-block', {
        title: i18n.__('Feature'), // The title of our block.
        icon: 'info', // Dashicon icon for our block
        category: 'common', // The category of the block.
        attributes: { // Necessary for saving block content.
            titleOne: {
                type: 'array',
                source: 'children',
                selector: '.jmadblocks-title-1',
            },
            textOne: {
                type: 'array',
                source: 'children',
                selector: '.jmadblocks-text-1',
            },
            mediaIDOne: {
                type: 'number',
            },
            mediaURLOne: {
                type: 'string',
                source: 'attribute',
                selector: '.jmadblocks-feature-image-1 img',
                attribute: 'src',
            },
            hrefOne: {
                type: 'url',
            },
            titleTwo: {
                type: 'array',
                source: 'children',
                selector: '.jmadblocks-title-2',
            },
            textTwo: {
                type: 'array',
                source: 'children',
                selector: '.jmadblocks-text-2',
            },
            mediaIDTwo: {
                type: 'number',
            },
            mediaURLTwo: {
                type: 'string',
                source: 'attribute',
                selector: '.jmadblocks-feature-image-2 img',
                attribute: 'src',
            },
            hrefTwo: {
                type: 'url',
            },
            alignment: {
                type: 'string',
                default: 'center',
            },
            columns: {
                type: 'select',
                default: '2'
            }
        },

        edit: function(props) {

            var focus = props.focus;
            var focusedEditable = props.focus ? props.focus.editable || 'titleOne' : null;
            var alignment = props.attributes.alignment;
            var attributes = props.attributes;
            var columns = props.attributes.columns;

            /* Event handlers */
            var onSelectImageOne = function(media) {
                return props.setAttributes({
                    mediaURLOne: media.url,
                    mediaIDOne: media.id,
                });
            };
            var onSetHrefOne = (value) => {
                props.setAttributes({
                    hrefOne: value,
                });
            };

            var onSelectImageTwo = function(media) {
                return props.setAttributes({
                    mediaURLTwo: media.url,
                    mediaIDTwo: media.id,
                });
            };
            var onSetHrefTwo = (value) => {
                props.setAttributes({
                    hrefTwo: value,
                });
            };

            function onChangeAlignment(newAlignment) {
                props.setAttributes({
                    alignment: newAlignment
                });
            }

            function onChangeCols(newColumns) {
                props.setAttributes({
                    columns: newColumns
                });
            }

            return [!!focus && el( // Display controls when the block is clicked on.
                    blocks.BlockControls, {
                        key: 'controls'
                    },
                    el(
                        blocks.AlignmentToolbar, {
                            value: alignment,
                            onChange: onChangeAlignment,
                        }
                    ),
                ), !!focus && el(
                    blocks.InspectorControls, {
                        key: 'inspector'
                    },
                    el('div', {
                            className: 'components-block-description'
                        }, // A brief description of our block in the inspector.
                        el('p', {}, i18n.__('Feature block options.')),
                    ),
                    el('h3', {}, i18n.__('Layout')), // The number of columns.
                    el(
                        SelectControl, {
                            type: 'number',
                            label: i18n.__('Number of Columns'),
                            value: columns,
                            onChange: onChangeCols,
                            options: [{
                                    value: '1',
                                    label: i18n.__('One column')
                                },
                                {
                                    value: '2',
                                    label: i18n.__('Two columns')
                                },
                            ],
                        }
                    ),
                ),
                el('div', {
                        className: props.className + ' jmadblocks-cols-' + attributes.columns
                    },
                    el('div', {
                            className: 'jmadblocks-block jmadblocks-block-1'
                        },
                        el('div', {
                                className: attributes.mediaIDOne ? 'jmadblocks-feature-image jmadblocks-feature-image-1 image-active' : 'jmadblocks-feature-image jmadblocks-feature-image-1 image-inactive',
                            },
                            el(blocks.MediaUpload, {
                                onSelect: onSelectImageOne,
                                type: 'image',
                                value: attributes.mediaIDOne,
                                render: function(obj) {
                                    return el(components.Button, {
                                            className: attributes.mediaIDOne ? 'image-button-1' : 'components-button button button-large button-one',
                                            onClick: obj.open
                                        },
                                        attributes.mediaIDOne ? el('img', {
                                            src: attributes.mediaURLOne
                                        }) : i18n.__('Upload Image')
                                    );
                                }
                            })
                        ),
                        el('div', {
                                className: 'jmadblocks-feature-content jmadblocks-feature-content-1',
                                style: {
                                    textAlign: alignment
                                }
                            },
                            el(blocks.Editable, {
                                tagName: 'h3',
                                className: 'jmadblocks-title-1',
                                inline: true,
                                placeholder: i18n.__('Feature Title 1'),
                                value: attributes.titleOne,
                                onChange: function(newTitle) {
                                    props.setAttributes({
                                        titleOne: newTitle
                                    });
                                },
                                focus: focusedEditable === 'titleOne' ? focus : null,
                                onFocus: function(focus) {
                                    props.setFocus(_.extend({}, focus, {
                                        editable: 'titleOne'
                                    }));
                                },
                            }),
                            el(blocks.Editable, {
                                tagName: 'p',
                                className: 'jmadblocks-text-1',
                                inline: true,
                                placeholder: i18n.__('Enter feature text...'),
                                value: attributes.textOne,
                                onChange: function(newText) {
                                    props.setAttributes({
                                        textOne: newText
                                    });
                                },
                                focus: focusedEditable === 'textOne' ? focus : null,
                                onFocus: function(focus) {
                                    props.setFocus(_.extend({}, focus, {
                                        editable: 'textOne'
                                    }));
                                },
                            }),
                        ),
                    ),
                    el('div', {
                            className: 'jmadblocks-block jmadblocks-block-2'
                        },
                        el('div', {
                                className: attributes.mediaIDTwo ? 'jmadblocks-feature-image jmadblocks-feature-image-2 image-active' : 'jmadblocks-feature-image jmadblocks-feature-image-2 image-inactive',
                            },
                            el(blocks.MediaUpload, {
                                onSelect: onSelectImageTwo,
                                type: 'image',
                                value: attributes.mediaIDTwo,
                                render: function(obj) {
                                    return el(components.Button, {
                                            className: attributes.mediaIDTwo ? 'image-button-2' : 'components-button button button-large button-two',
                                            onClick: obj.open
                                        },
                                        attributes.mediaIDTwo ? el('img', {
                                            src: attributes.mediaURLTwo
                                        }) : i18n.__('Upload Image')
                                    );
                                }
                            }),
                        ),
                        el('div', {
                                className: 'jmadblocks-feature-content jmadblocks-feature-content-2',
                                style: {
                                    textAlign: alignment
                                }
                            },
                            el(blocks.Editable, {
                                tagName: 'h3',
                                className: 'jmadblocks-title-2',
                                inline: false,
                                placeholder: i18n.__('Feature Title 2'),
                                value: attributes.titleTwo,
                                onChange: function(newTitle) {
                                    props.setAttributes({
                                        titleTwo: newTitle
                                    });
                                },
                                focus: focusedEditable === 'titleTwo' ? focus : null,
                                onFocus: function(focus) {
                                    props.setFocus(_.extend({}, focus, {
                                        editable: 'titleTwo'
                                    }));
                                },
                            }),
                            el(blocks.Editable, {
                                tagName: 'p',
                                className: 'jmadblocks-text-2',
                                inline: true,
                                placeholder: i18n.__('Enter feature text...'),
                                value: attributes.textTwo,
                                onChange: function(newText) {
                                    props.setAttributes({
                                        textTwo: newText
                                    });
                                },
                                focus: focusedEditable === 'textTwo' ? focus : null,
                                onFocus: function(focus) {
                                    props.setFocus(_.extend({}, focus, {
                                        editable: 'textTwo'
                                    }));
                                },
                            }),
                        ),
                    ),
                )
            ];
        },

        save: function(props) {
            var attributes = props.attributes;
            var alignment = props.attributes.alignment;

            return (
                el('div', {
                        className: props.className + ' jmadblocks-cols-' + attributes.columns
                    },
                    el('div', {
                            className: 'jmadblocks-block jmadblocks-block-1'
                        },
                        attributes.mediaURLOne &&
                        el('div', {
                                className: 'jmadblocks-feature-image jmadblocks-feature-image-1',
                                style: {}
                            },
                            el('img', {
                                src: attributes.mediaURLOne
                            }),
                        ),
                        el('div', {
                                className: 'jmadblocks-feature-content jmadblocks-feature-content-1',
                                style: {
                                    textAlign: attributes.alignment
                                }
                            },
                            el('h3', {
                                className: 'jmadblocks-title-1'
                            }, attributes.titleOne),
                            el('p', {
                                className: 'jmadblocks-text-1'
                            }, attributes.textOne),
                        ),
                    ),
                )
            );
        },

    })

})(
    window.wp.blocks,
    window.wp.i18n,
    window.wp.element,
);