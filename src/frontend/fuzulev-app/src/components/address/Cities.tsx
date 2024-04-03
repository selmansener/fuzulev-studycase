import { Autocomplete, TextField } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGetApiV1AddressCitiesQuery } from "../../store/api";

export interface CitiesProps {
    values?: string[],
    error?: boolean,
    helperText?: string | false,
    onChange: (values: { code?: string, name?: string }[]) => void;
}

export function Cities(props: CitiesProps) {
    const { t } = useTranslation();
    const { isLoading, data: cities, error: getCitiesError } = useGetApiV1AddressCitiesQuery();
    const { values, error, helperText, onChange } = props;
    const ref = useRef<HTMLInputElement>();

    const getCities = () => {
        const selectedCities = cities?.filter(x => values?.some(y => y == x.name));
        if (selectedCities) {
            return selectedCities.map(x => {
                return {
                    code: x.code,
                    name: x.name,
                    label: x.name
                }
            });
        }
        else {
            return []
        }
    }

    return (
        <Autocomplete
            id="city"
            disabled={isLoading}
            multiple
            value={getCities()}
            onChange={(e, value) => {
                onChange(value.map(x => {
                    return {
                        code: x.code,
                        name: x.name
                    }
                }))
            }}
            disablePortal
            options={cities && cities?.length > 0 ? cities?.map(city => {
                return {
                    ...city,
                    label: city.name
                }
            }) : []}
            renderInput={(params) => <TextField
                inputRef={ref}
                {...params}
                name={"city"}
                error={error}
                helperText={helperText}
                label={t("Generic.Address.City")}
            />}
        />
    );
}