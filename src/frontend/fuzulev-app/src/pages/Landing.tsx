import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, Theme, Typography, useTheme } from "@mui/material";
import { ImageSlider } from "../components/imageSlider/ImageSlider";
import CategoryIcon from '@mui/icons-material/Category';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HubIcon from '@mui/icons-material/Hub';
import Image from "mui-image";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import VideocamIcon from '@mui/icons-material/Videocam';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { format, formatDuration, intervalToDuration } from "date-fns";
import React, { useEffect, useState } from "react";
import { RealEstateDto, RealEstateType, api, useGetApiV1RealEstateQueryQuery } from "../store/api";
import { Cities } from "../components/address/Cities";
import { Districts } from "../components/address/Districts";
import { DataGrid, GridCellParams, GridColDef, GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import { tr } from "date-fns/locale/tr";
import { useAppDispatch } from "../store/hooks";

const types: RealEstateType[] = [
    "Residence",
    "Apartment",
    "Office",
    "RetailShop",
    "Warehouse"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type PriceRange = {
    minInclusive: number,
    maxInclusive: number
}

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

type Pagination = {
    count: number,
    offset: number
}


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID'
    },
    {
        field: 'title',
        headerName: 'Title',

    },
    {
        field: 'price',
        headerName: 'Price',

    },
    {
        field: 'type',
        headerName: 'Type'

    },
    {
        field: 'city',
        headerName: 'City'
    },
    {
        field: 'district',
        headerName: 'District'
    },
    {
        field: 'address',
        headerName: 'Address',
    },
    {
        field: 'createdAt',
        headerName: 'Oluşturulma Tarihi',
        valueFormatter: (value) => {
            return format(new Date(value), 'dd.MM.yyyy', { locale: tr })
        }
    },
];

export default function Landing() {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const [realEstateType, setRealEstateType] = React.useState<string[]>([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    const [totalCount, setTotalCount] = useState(0);
    const [priceRange, setPriceRange] = useState<PriceRange>({
        minInclusive: 100,
        maxInclusive: 500
    });
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedCityCodes, setSelectedCityCodes] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const { data: realEstatesResult, isLoading, isFetching } = api.endpoints.getApiV1RealEstateQuery.useQueryState({
        cities: selectedCities.length > 0 ? selectedCities.join(',') : undefined,
        districts: selectedDistricts.length > 0 ? selectedDistricts.join(',') : undefined,
        types: realEstateType.length > 0 ? realEstateType.join(',') : undefined,
        minPriceInclusive: priceRange.minInclusive,
        maxPriceInclusive: priceRange.maxInclusive,
        offset: paginationModel.page * paginationModel.pageSize,
        count: paginationModel.pageSize
    });

    const handleTypeChange = (event: SelectChangeEvent<typeof realEstateType>) => {
        const {
            target: { value },
        } = event;
        setRealEstateType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        if (typeof (newValue) === "object" && newValue.length > 0) {
            setPriceRange({
                minInclusive: newValue[0],
                maxInclusive: newValue[1]
            });
        }
    };

    useEffect(() => {
        if (isLoading || isFetching) {
            return;
        }

        if (realEstatesResult?.totalRowCount) {
            setTotalCount(realEstatesResult.totalRowCount);
        }

    }, [realEstatesResult, isLoading, isFetching]);

    useEffect(() => {
        const offset = paginationModel.page * paginationModel.pageSize;
        const count = paginationModel.pageSize;


        dispatch(api.endpoints.getApiV1RealEstateQuery.initiate({
            cities: selectedCities.length > 0 ? selectedCities.join(',') : undefined,
            districts: selectedDistricts.length > 0 ? selectedDistricts.join(',') : undefined,
            types: realEstateType.length > 0 ? realEstateType.join(',') : undefined,
            minPriceInclusive: priceRange.minInclusive,
            maxPriceInclusive: priceRange.maxInclusive,
            offset: offset,
            count: count
        }))

    }, [paginationModel]);

    return <Container maxWidth="xl">
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Real Estate Type</InputLabel>
                    <Select
                        id="demo-multiple-name"
                        multiple
                        value={realEstateType}
                        onChange={handleTypeChange}
                        input={<OutlinedInput label="Real Estate Type" />}
                        MenuProps={MenuProps}
                    >
                        {types.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, realEstateType, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <Typography>Price Range</Typography>
                    <Box>
                        <Slider
                            min={0}
                            max={1000}
                            value={[priceRange.minInclusive, priceRange.maxInclusive]}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                        />

                    </Box>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <Cities
                        values={selectedCities}
                        onChange={(cities) => {
                            if (cities) {
                                setSelectedCities(cities.map(x => x.name ?? ""));
                                setSelectedCityCodes(cities.map(x => x.code ?? ""));
                            }
                        }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <Districts
                        selectedCities={selectedCityCodes}
                        values={selectedDistricts}
                        onChange={(districts) => {
                            setSelectedDistricts(districts.map(x => x.name ?? ""));
                        }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={() => {

                        const offset = paginationModel.page * paginationModel.pageSize;
                        const count = paginationModel.pageSize;

                        dispatch(api.endpoints.getApiV1RealEstateQuery.initiate({
                            cities: selectedCities.length > 0 ? selectedCities.join(',') : undefined,
                            districts: selectedDistricts.length > 0 ? selectedDistricts.join(',') : undefined,
                            types: realEstateType.length > 0 ? realEstateType.join(',') : undefined,
                            minPriceInclusive: priceRange.minInclusive,
                            maxPriceInclusive: priceRange.maxInclusive,
                            offset: offset,
                            count: count
                        }))
                    }}>
                        Apply
                    </Button>
                </FormControl>
            </Grid>
            <Grid item xs={9}>
                <Box width="100%" >
                    <DataGrid
                        autosizeOnMount={true}
                        autosizeOptions={{
                            expand: true
                        }}
                        autoHeight
                        loading={isLoading || isFetching}
                        rowCount={totalCount}
                        rows={realEstatesResult?.data ?? []}
                        columns={columns}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 25, 50, 100]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Grid>
        </Grid>
    </Container>

}