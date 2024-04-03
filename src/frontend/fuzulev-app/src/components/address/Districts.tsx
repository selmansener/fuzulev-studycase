import { Autocomplete, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, useGetApiV1AddressGetDistrictsQuery } from "../../store/api";
import { useAppDispatch } from "../../store/hooks";

export interface DistrictsProps {
    selectedCities?: string[],
    values?: string[],
    onChange: (values: { code?: string, name?: string }[]) => void;
}

export function Districts(props: DistrictsProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { values, onChange, selectedCities } = props;
    let { isLoading: districtsLoading, data: districts, error: getDistrictError } = useGetApiV1AddressGetDistrictsQuery({
        cityIds: selectedCities?.join(',')
    });
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        if (selectedCities) {
            dispatch(api.endpoints.getApiV1AddressGetDistricts.initiate({
                cityIds: selectedCities?.join(',')
            })).then(({ isLoading, data, error }) => {
                districtsLoading = isLoading;
                districts = data;
                getDistrictError = error;
            });

        }
    }, [selectedCities]);

    const getDistricts = () => {
        const selectedDistricts = districts?.filter(x => values?.some(y => y == x.name));

        if (selectedDistricts) {
            return selectedDistricts.map(x => {
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
            id="district"
            multiple
            value={getDistricts()}
            disabled={districtsLoading}
            onChange={(e, value) => {
                onChange(value.map(x => {
                    return {
                        code: x?.code,
                        name: x?.name
                    }
                }))
            }}
            disablePortal
            options={districts && districts?.length > 0 ? districts?.map(district => {
                return {
                    ...district,
                    label: district.name
                }
            }) : []}
            renderInput={(params) => <TextField
                inputRef={ref}
                {...params}
                name={"district"}
                label={t("Generic.Address.District")}
            />}
        />
    );
}