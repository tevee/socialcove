/**
 * Creates a parsed post form to HTML with imported text editor and tooltips
 * Text editor is imported from Quill library
 * Tooltip is in hints.css
 */
import * as template from "./templates/post-form.js";
import CreatePostFormDropdown from "./CreatePostFormDropdown.js";
import { stringToDOM} from "../../utilities/templateUtils.js";
import Quill from "quill";
import * as api from "../../api.js";

export default class PostForm {
    static async create(): Promise<HTMLDivElement> {
        const categories = await api.getAllCategories();

        const mainContainerEl = stringToDOM(template.mainContainer);
        const postFormDropdown = mainContainerEl.querySelector('.category-container > select') as HTMLSelectElement;

        categories.forEach(category => {
            postFormDropdown.append(CreatePostFormDropdown.create(category))
        })

        const textEditorContainer = mainContainerEl.querySelector('#textEditor')

        const quill = new Quill(textEditorContainer, {
            modules: {
                toolbar: [
                    [
                        'bold',
                        'italic',
                        'link',
                        'strike',
                        'code',
                        {script: 'super'},
                    ],
                    [
                        {header: 1},
                        {list: 'bullet'},
                        {list: 'ordered'},
                        'blockquote',
                        'code-block',
                        'image',
                        'video',
                    ],
                ],
                clipboard: {matchVisual: false} as any
            },
            placeholder: 'Text',
            theme: 'snow',
        })

        const toolbar = quill.getModule('toolbar');
        if (toolbar) toolbar.addHandler('image', imageHandler);

        function imageHandler() {
            const range = quill.getSelection();
            if(range !== null) {
                const url = prompt('Enter the URL of the image:');
                if (url) {
                    quill.focus();
                    quill.insertEmbed(range.index, 'image', url, Quill.sources.USER);

                    // Qull editor does not support adding custom classes
                    // Adding classes to created images by linked url
                    setTimeout(() => {
                        const images = document.querySelectorAll('.ql-editor img[src="' + url + '"]');
                        images.forEach((image: Element) => {
                            image.classList.add('linked-image');
                        });
                    }, 1);
                }
            }
        }

        quill.on('editor-change', (eventType: string) => {
            if (eventType === 'text-change') {
                addToolTipsToQuillButtons(mainContainerEl);
            }
        });
        
        const textEditorToolbar = mainContainerEl.querySelector('.ql-toolbar');
        const divContentEditable = textEditorContainer.querySelector('.ql-editor');

        textEditorContainer.classList.add('anthme-editor-container');
        textEditorToolbar.classList.add('anthme-toolbar');
        divContentEditable.classList.add('check-form-validity');

        return mainContainerEl;
    }
}

export function addToolTipsToQuillButtons(mainContainerEl: HTMLElement): void {
    const quillToolbarEl = mainContainerEl.querySelector('.ql-toolbar') as HTMLElement;
    const quillFormatsEl = mainContainerEl.querySelector('.ql-formats') as HTMLElement;

    if (quillToolbarEl && quillFormatsEl) {
        const quillButtons = [...quillToolbarEl.querySelectorAll('button'), ...quillFormatsEl.querySelectorAll('button')];
        quillButtons.forEach((button: HTMLElement) => {
            const label = getLabelForQuillButton(button);
            if (label) {
                button.setAttribute('aria-label', label);
                button.classList.add('hint', 'hint--rounded', 'hint--top');

            }
        });
    }
}

function getLabelForQuillButton(button: HTMLElement): string | null {
    const btnClassNames: { [key: string]: string } = {
        'ql-bold': 'Bold',
        'ql-italic': 'Italic',
        'ql-link': 'Create link',
        'ql-strike': 'Line through',
        'ql-code': 'Tag',
        'ql-script': 'Superscript',
        'ql-header': 'Header',
        'ql-image': 'Image',
        'ql-blockquote': 'Blockquote',
        'ql-code-block': 'Codeblock',
        'ql-video': 'Video'
    };

    const btnClasses = button.classList;
    let label: string = '';

    for (const btnClassName of Object.keys(btnClassNames)) {
        if (btnClasses.contains(btnClassName)) {
            return btnClassNames[btnClassName];
        }
    }

    const buttonValue = button.getAttribute('value');
    if (buttonValue === 'ordered') {
        label = 'Ordered list';
    } else if (buttonValue === 'bullet') {
        label = 'Unordered list';
    } else if (buttonValue) {
        label = 'List';
    }

    return label;
}
