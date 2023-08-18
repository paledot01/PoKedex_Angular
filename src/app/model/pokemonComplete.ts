export interface  PokemonComplete{
    abilities?:                any[];
    base_experience?:          number;
    forms?:                    any[];
    game_indices?:             any[];
    height?:                   number;
    held_items?:               any[];
    id?:                       number;
    is_default?:               boolean;
    location_area_encounters?: string;
    moves?:                    any[];
    name?:                     string;
    order?:                    number;
    past_types?:               any[];
    species?:                  Species;
    sprites?:                  any;
    stats?:                    any[];
    types?:                    Type[];
    weight?:                   number;
}
export interface Type {
    slot: number;
    type: Species;
}
export interface Species {
    name: string;
    url:  string;
}