import React, { ChangeEvent } from "react";
import { Icon, IconButton, InputAdornment, styled, TextFieldProps } from "@mui/material";
import { useController, Control, FieldValues } from "react-hook-form";
import ControlMUITextField from "./ControlMUItextField";

const Input = styled("input")({
    display: "none",
});

interface UploadFileProps extends Omit<TextFieldProps, 'name' | 'control'> {
    name: string;
    control: any;
    defaultValue?: any;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    icon: string;
    accept: string;
    setValue: any;
    iconDisable?: boolean;
    rules: any
    fileName?: string
}

const UploadFile: React.FC<UploadFileProps> = (props) => {
    const {
        name,
        control,
        defaultValue,
        onChange,
        icon,
        accept,
        setValue,
        iconDisable,
        rules,
        fileName,
        ...restProps
    } = props;

    const {
        formState: { errors },
        field: { onChange: fieldChange, value, ...fieldProps },
    } = useController({
        name,
        control,
        defaultValue: defaultValue ?? "",
    });

    const handelChangeShipment = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.item(0)?.name) {
            setValue(fileName ?? "fileName", e.target.files?.item(0)?.name, {
                shouldValidate: true,
            });
        }
    };

    return (
        <ControlMUITextField
            control={control}
            name={fileName ?? "fileName"}
            readOnly
            rules={rules}
            {...restProps}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <label htmlFor="icon-button-file">
                            <Input
                                {...fieldProps}
                                name={name}
                                disabled={iconDisable}
                                value={value?.filename}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files?.item(0)?.name) {
                                        fieldChange(e.target.files?.[0]);
                                        handelChangeShipment(e);
                                    }
                                    onChange && onChange(e);
                                }}
                                onClick={(event: any) => {
                                    if (!value) {
                                        event.target.value = null;
                                    }
                                }}
                                accept={accept}
                                id="icon-button-file"
                                type="file"
                            />
                            <IconButton
                                disabled={iconDisable}
                                color="default"
                                aria-label="upload"
                                component="span"
                                size="large"
                            >
                                <Icon>{icon}</Icon>
                            </IconButton>
                        </label>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default UploadFile;
