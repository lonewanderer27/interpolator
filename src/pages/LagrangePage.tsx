import "katex/dist/katex.min.css";

import * as Form from "@radix-ui/react-form";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Switch from "@radix-ui/react-switch";

import React, { useContext, useState } from "react";

import Button from "../components/Button";
import { GlobalState } from "../App";
import PolrsButtonProps from "../interfaces";
import TeX from "@matejmazur/react-katex";
import { modes } from "../enums";
import solve from "../calculators/lagrange";

function LagrangePage() {
  const {
    xVars,
    setXVars,
    yVars,
    setYVars,
    n,
    setN,
    setPVars,
    pVars,
    setP,
    p,
    mode,
    setMode,
    lagrangeSolveReturns,
    setLagrangeSolveReturns,
  } = useContext(GlobalState);

  console.log("lagrangeSolveReturns");
  console.table(lagrangeSolveReturns);

  const [showP, setShowP] = useState<boolean>(false);

  const toggleShowP = () => {
    setLagrangeSolveReturns(() => solve(n, xVars, yVars, pVars));
    setShowP((prev) => !prev);
  };

  const addP = () => {
    setP((prev) => prev + 1);
    setPVars((prev) => [...prev, "0"]);
  };

  const minusP = () => {
    setP((prev) => prev - 1);
    setPVars((prev) => prev.slice(0, prev.length - 1));
  };

  const handlePnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newN = Number.parseInt(e.target.value);
    setPVars((prev) => {
      let newVal = prev;
      if (newN > p) {
        newVal = [...prev, "0"];
      } else {
        newVal = prev.slice(0, newN);
      }

      console.log("pVars:");
      console.table(newVal);
      return newVal;
    });
    setP(newN);
  };

  const handlePVarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const varType = e.target.name.split("-")[0];
    const index = Number.parseInt(e.target.name.split("-")[1]);

    console.log("varType: " + varType);
    console.log("index: " + index);
    console.log("value: " + e.target.value);

    setPVars((prev) => {
      let newVal = [...prev];
      newVal[index] = e.target.value;
      return newVal;
    });
  };

  const handleVarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const varType = e.target.name.split("-")[0];
    const index = Number.parseInt(e.target.name.split("-")[1]);

    console.log("varType: " + varType);
    console.log("index: " + index);
    console.log("value: " + e.target.value);

    switch (varType) {
      case "x":
        setXVars((prev) => {
          let newVal = [...prev];
          newVal[index] = e.target.value;
          return newVal;
        });
        break;
      case "y":
        setYVars((prev) => {
          let newVal = [...prev];
          newVal[index] = e.target.value;
          return newVal;
        });
        break;
    }
  };

  const addN = () => {
    setN((prev) => prev + 1);
    modifyXVars(n + 1);
    modifyYVars(n + 1);
  };

  const minusN = () => {
    setN((prev) => prev - 1);
    modifyXVars(n - 1);
    modifyYVars(n - 1);
  };

  const modifyXVars = (newN: number) => {
    setXVars((prev) => {
      let newVal = prev;
      if (newN > n) {
        newVal = [...prev, "0"];
      } else {
        newVal = prev.slice(0, newN);
      }

      console.log("xVars:");
      console.table(newVal);
      return newVal;
    });
  };

  const modifyYVars = (newN: number) => {
    setYVars((prev) => {
      let newVal = prev;
      if (newN > n) {
        newVal = [...prev, "0"];
      } else {
        newVal = prev.slice(0, newN);
      }

      console.log("yVars:");
      console.table(newVal);
      return newVal;
    });
  };

  const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newN = Number.parseInt(e.target.value);
    modifyXVars(newN);
    modifyYVars(newN);
    setN(newN);
  };

  return (
    <div className="sb">
      <div className="sb-inner">
        <div className="sb-i-main h-100">
          <div className="grid grid-cols-2">
            <h1 className="sb-i-up-title">Lagrange Method</h1>
            <div
              className="flex items-center justify-end"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label
                className="text-white text-[15px] leading-none pr-[15px]"
                htmlFor="airplane-mode"
              >
                {mode === modes.PREDEFINED
                  ? "Predefined Mode"
                  : "User Defined Mode"}
              </label>
              <Switch.Root
                className="w-[42px] h-[25px] bg-[#232325] rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-gray outline-none cursor-default"
                id="airplane-mode"
                onCheckedChange={() =>
                  setMode((prev) => {
                    if (prev === modes.PREDEFINED) return modes.USER_DEFINED;
                    else return modes.PREDEFINED;
                  })
                }
                checked={mode === modes.USER_DEFINED ? true : false}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <ScrollArea.Root className="w-[95%] max-h-[350px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7">
              <ScrollArea.Viewport className="w-full h-full rounded">
                <Form.Root
                  className="w-[260px]"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Form.Field className="grid mb-[10px]" name="n">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        n
                      </Form.Label>
                    </div>
                    <div className="grid grid-cols-3">
                      <Form.Control asChild>
                        <input
                          className="box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-slateA"
                          type="number"
                          onChange={handleNChange}
                          value={n}
                          min={2}
                          disabled={showP}
                          title={
                            showP
                              ? "Click the Resolve button enable this button"
                              : "Click to add coordinate"
                          }
                          required
                        />
                      </Form.Control>
                      <Button
                        variant={showP ? "disabled" : "secondary"}
                        onClick={showP ? undefined : () => addN()}
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Resolve button enable this button"
                            : "Click to add coordinate"
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant={showP || n <= 2 ? "disabled" : "secondary"}
                        onClick={showP || n <= 2 ? undefined : () => minusN()}
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Resolve button enable this button"
                            : "Click to add coordinate"
                        }
                      >
                        -
                      </Button>
                    </div>
                  </Form.Field>

                  <Form.Field className="grid mb-[10px]" name="coordinates">
                    <div className="grid grid-cols-2">
                      <div>
                        <span className="w-full flex justify-center mb-1">
                          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                            x coordinates
                          </Form.Label>
                        </span>
                        {xVars.map((i, index) => {
                          return (
                            <Form.Control asChild>
                              <input
                                className="leading-[35px] box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 mr-1 mb-1"
                                type="number"
                                value={i}
                                name={`x-${index}`}
                                onChange={handleVarChange}
                                disabled={showP}
                                title={
                                  showP
                                    ? "Click the Resolve button modify this value"
                                    : ""
                                }
                                required
                              />
                            </Form.Control>
                          );
                        })}
                      </div>

                      <div>
                        <span className="w-full flex justify-center mb-1">
                          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                            y coordinates
                          </Form.Label>
                        </span>
                        {yVars.map((i, index) => (
                          <Form.Control asChild>
                            <input
                              className="leading-[35px] box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 ml-1 mb-1"
                              type="number"
                              min={1}
                              value={i}
                              name={`y-${index}`}
                              onChange={handleVarChange}
                              disabled={showP}
                              title={
                                showP
                                  ? "Click the Resolve button modify this value"
                                  : ""
                              }
                              required
                            />
                          </Form.Control>
                        ))}
                      </div>
                    </div>
                  </Form.Field>
                </Form.Root>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            <ScrollArea.Root className="w-[95%] max-h-[350px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7">
              <ScrollArea.Viewport className="w-full h-full rounded">
                <Form.Root
                  className="w-[260px]"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Form.Field className="grid mb-[10px]" name="P(x)">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        Amount of P(x) variables
                      </Form.Label>
                    </div>
                    <div className="grid grid-cols-3">
                      <Form.Control asChild>
                        <input
                          className="box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-slateA"
                          type="number"
                          onChange={handlePnChange}
                          value={p}
                          min={1}
                          disabled={showP}
                          title={
                            showP
                              ? "Click the Resolve button modify this value"
                              : ""
                          }
                          required
                        />
                      </Form.Control>
                      <Button
                        variant={showP ? "disabled" : "secondary"}
                        onClick={showP ? undefined : () => addP()}
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Resolve button enable this button"
                            : "Click to add P(x) variable"
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant={showP || p <= 1 ? "disabled" : "secondary"}
                        onClick={showP || p <= 1 ? undefined : () => minusP()}
                        size="sm"
                        className="ml-1"
                        title={
                          showP
                            ? "Click the Resolve button enable this button"
                            : "Click to add P(x) variable"
                        }
                      >
                        -
                      </Button>
                    </div>
                  </Form.Field>

                  <Form.Field className="grid mb-[10px]" name="P(x) variables">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        P(x) variables
                      </Form.Label>
                    </div>
                    {pVars.map((i, index) => {
                      return (
                        <Form.Control asChild>
                          <input
                            className="leading-[35px] box-border w-full bg-[#232325] shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 mb-1"
                            type="number"
                            value={i}
                            name={`p-${index}`}
                            onChange={handlePVarChange}
                            disabled={showP}
                            title={
                              showP
                                ? "Click the Resolve button modify this value"
                                : ""
                            }
                            required
                          />
                        </Form.Control>
                      );
                    })}
                  </Form.Field>
                  <Button
                    className="mt-3"
                    variant={showP ? "secondary" : "primary"}
                    size="sm"
                    onClick={toggleShowP}
                  >
                    {showP ? "Resolve" : "Solve"}
                  </Button>
                </Form.Root>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>

          {showP && (
            <ScrollArea.Root className="w-[95%] max-h-[300px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 mt-8">
              <ScrollArea.Viewport className="w-full h-full rounded">
                <div className="grid grid-cols-2 mb-4">
                  <p className="sb-i-up-desc">Final Polynomial / Expression</p>
                  <TeX math={lagrangeSolveReturns!.s_tex} block></TeX>
                </div>
                <div className="grid grid-cols-2 mb-4">
                  <p className="sb-i-up-desc">P(x) results</p>
                  <div>
                    {lagrangeSolveReturns!.pxAnswers.map((PxAns) => {
                      return (
                        <div className="grid grid-cols-2">
                          <p>{Object.keys(PxAns).toString()} =</p>
                          <p>{Object.values(PxAns).toString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          )}
        </div>
      </div>
    </div>
  );
}

export default LagrangePage;
