export type TemplateProps =
  | {
      container?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > & {
        className?: string;
        id?: string;
        name?: string;
      };
      input?: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      > & {
        className?: string;
        id?: string;
        name: string;
        type: string;
        groupName?: string;
      };
      label?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      > & {
        text?: string | (() => JSX.Element);
        htmlFor?: string;
        className?: string;
        id?: string;
        name?: string;
      };
    }
  | {
      render: (params: any) => JSX.Element;
      container: never;
      input: never;
      label: never;
    };

export type FormProps = {
  // customButton?: () => JSX.Element | React.ReactElement;
  onEdit?: {
    editData: Boolean;
    api?: (slug?: string) => string;
    edit?: (values: any) => void;
    body?: [name: string];
    editingData: {
      [key: string]: any;
    };
  };
  onSubmit?: {
    submitButton?:
      | (React.HTMLProps<HTMLButtonElement> & {
          displayText?: string;
        })
      | (() => JSX.Element);
    api: (slug?: string) => string;
    submit: (params: any) => void;
    body?: string[] | (() => { [key: string]: any });
  };
  onUpdate?: {
    api?: (slug?: string) => string;
    update?: (values: any) => void;
    body?: [name: string];
  };
  template: TemplateProps[];
  inputContainer?: {
    className?: string | '';
    exclude: number[] | string[];
  };
  validationSchema: {
    [key: string]: any;
  };
};

export type RenderInputsProps =
  | {
      template: TemplateProps[];
      handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      values: { [key: string]: any };
      errors?: { [key: string]: any };
      touched: { [key: string]: any };
    }
  | {
      render: () => JSX.Element;
      template: never;
      values: never;
      errors: never;
      touched: never;
      handleChange: never;
    };

export type InputProps =
  | {
      templateInput: TemplateProps | {};
      errors?: {
        [key: string]: any;
      };
      handleChange: React.ChangeEventHandler<HTMLInputElement>;
      touched: {
        [key: string]: any;
      };
      values: { [key: string]: any };
    }
  | {
      templateInput: TemplateProps;
      errors: never;
      handleChange: never;
      touched: never;
      values: never;
    };
