import React, { memo } from "react";
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    useTheme,
    SelectChangeEvent,
    TextFieldProps,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
} from "@mui/material";
import { useController, Control, FieldValues, FieldError } from "react-hook-form";

interface MUIRadioGroupProps extends Omit<TextFieldProps, 'name' | 'control'> {
    control: any;
    data: { value: string | number; key: string }[];
    name: string;
    disabled?: boolean;
    margin?: "none" | "dense" | "normal";
    label: string;
    onChanges?: (event: SelectChangeEvent<string | number>) => void;
    rules?: any; // You can type this more strictly based on your validation rules
    readOnly?: boolean;
    defaultValue?: string | number;
}

const MUIRadioGroup: React.FC<MUIRadioGroupProps> = (props) => {
    const {
        control,
        data,
        name,
        disabled = false,
        margin = "none",
        label,
        onChanges,
        rules,
        readOnly = false,
        defaultValue,
    } = props;

    const theme = useTheme();
    const dir = theme.direction;

    const {
        formState: { errors },
        field: { ref, value: val, onChange: fieldChange, ...fieldProps },
    } = useController({
        name,
        control,
        rules: { ...rules },
        defaultValue: data && defaultValue ? defaultValue : "",
    });

    const errorName = name.includes(".") && name.split(".");
    const fieldError: FieldError | undefined = errorName
        ? (errors?.[errorName[0]] as any)?.[errorName[1]]
        : (errors?.[name] as FieldError | undefined);

    const isRequired = (rules && rules.required) || (rules && rules.validate);

    return (
        <FormControl variant="filled" fullWidth size="small">
            <FormLabel id={name}>{isRequired ? label + " *" : label}</FormLabel>
            <RadioGroup
                {...fieldProps}
                aria-labelledby={name}
                value={val}
                defaultValue={data && defaultValue ? defaultValue : ""}
                onChange={(e) => {
                    fieldChange(e.target.value);
                    onChanges && onChanges(e);
                }}
            >
                {data?.map((items, index) => (
                    <FormControlLabel key={index} value={items.value} control={<Radio />} label={items.key} />
                ))}
            </RadioGroup>

            {fieldError?.message && (
                <FormHelperText error>{fieldError.message}</FormHelperText>
            )}
        </FormControl>
    );
};

export default memo(MUIRadioGroup);
