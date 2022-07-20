

export interface TopLevelSugge {
    form_name:      string;
    form_names:     any[];
    form_order:     number;
    id:             number;
    is_battle_only: boolean;
    is_default:     boolean;
    is_mega:        boolean;
    name:           string;
    names:          any[];
    order:          number;
    pokemon:        Pokemon;
    sprites:        Object;
    types:          number[];
    version_group:  Pokemon;
}

export interface Pokemon {
    name: string;
    url:  string;
}

export interface SpritesSugge {
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
}

export interface TypeSugge {
    slot: number;
    type: number[];
}
