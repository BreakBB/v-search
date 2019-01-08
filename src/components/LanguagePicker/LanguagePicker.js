import React from 'react';
import {observer} from 'mobx-react';
import Select from "@material-ui/core/es/Select/Select";
import langStore from "../../stores/LangStore"
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import configStore from "../../stores/ConfigStore";

class LanguagePicker extends React.Component {

  handleChange = (event) => {
    if (event.target.value === langStore.DE) {
      langStore.setLanguage(langStore.DE);
      configStore.update();
    }
    else if (event.target.value === langStore.COM) {
      langStore.setLanguage(langStore.COM);
      configStore.update();
    }
  };

  render() {
    return (
      <Select
        value={langStore.language}
        onChange={this.handleChange}
      >
        <MenuItem value={langStore.DE}>{langStore.DE}</MenuItem>
        <MenuItem value={langStore.COM}>{langStore.COM}</MenuItem>
      </Select>
    )
  }
}

export default observer(LanguagePicker);