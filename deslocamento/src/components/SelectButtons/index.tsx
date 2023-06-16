"use client";
import React from "react";
import { Button } from "@mui/material";

import "./style.css";

interface SelectButtonsProps {}

export function SelectButtons(props: SelectButtonsProps) {
  return (
    <div className="main">
      <Button className="button-55" variant="outlined" size="medium">
        Cliente
      </Button>
      <Button className="button-55" variant="outlined" size="medium">
        Condutor
      </Button>
      <Button className="button-55" variant="outlined" size="medium">
        Veículo
      </Button>
      <Button className="button-55" variant="outlined" size="medium">
        Deslocamento
      </Button>
    </div>
  );
}
