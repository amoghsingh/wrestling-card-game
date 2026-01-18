import {render, screen} from "@testing-library/react";
import Dashboard from ".";"./index";
import {describe, it, expect} from "vitest";


describe("Dashboard", ()=>{

        it("renders the UI", ()=>{
            render(<Dashboard/>);
            const element = screen.getByText("VS");
            expect(element).toHaveClass("vs");
        })

})
