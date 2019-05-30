import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ValidateDNI implements ComponentFramework.StandardControl<IInputs, IOutputs> {


    // label element created as part of this control
    private dni_label: HTMLInputElement;

    // This element contains all elements of our custom controle
    private _container: HTMLDivElement;
    //set the context
    private _context: ComponentFramework.Context<IInputs>;


    private _value: string;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
        // Creating the label for the control and setting the relevant values.
        this.dni_label = document.createElement("input");
        this.dni_label.setAttribute("type", "label");
        this._context = context;
        this.dni_label.addEventListener('keyup', this.onKeyUp.bind(this));

        // Adding the label and button created to the container DIV.
        this._container = document.createElement("div");
        this._container.appendChild(this.dni_label);
        container.appendChild(this._container);

	}

    private onKeyUp(event: Event): void {
        this._value = this.dni_label.value;

        if (this._value != "") {

            if (this.validarDNI(this._value)) {
                this.dni_label.classList.add("Valid_Button_Style");
                this.dni_label.classList.remove("Invalid_Button_Style");
            }
            else {
                this.dni_label.classList.add("Invalid_Button_Style");
                this.dni_label.classList.remove("Valid_Button_Style");
            }   


        }
    }

    private validarDNI(value: String):boolean {

        var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
        var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        var str = value.toString().toUpperCase();

         if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

          var nie = str
               .replace(/^[X]/, '0')
               .replace(/^[Y]/, '1')
               .replace(/^[Z]/, '2');

         var letter = str.substr(-1);
         var charIndex = parseInt(nie.substr(0, 8)) % 23;

        if (validChars.charAt(charIndex) === letter) return true;

        return false;
   }


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view

        this._context = context;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
    }


}