#![recursion_limit = "1024"]

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

macro_rules! js_colour {
    ($colour:expr) => {
        JsValue::from_str($colour);
    };
}

mod pathfinding;

// use anyhow::Result;
use console_error_panic_hook::set_once as set_panic_hook;
use console_log;
use std::{error::Error, f64, sync::Arc};
use wasm_bindgen::prelude::*;
use web_sys::{
    js_sys::{Function, WebAssembly::validate},
    window, CanvasRenderingContext2d, Document, Element, HtmlCanvasElement, Window,
};
use anyhow::Result; 

// sell size in pixels
const CELL_SIZE: usize = 60;
const GRID_LINE_WEIGHT: usize = 1;
const GRID_COLOUR: &str = "#CCCCCC";
// const WIDTH_FRACTION

fn main() {
    // set console log as panic hook
    set_panic_hook();

    // get html elements
    let mut document = window()
        .and_then(|win| win.document())
        .expect("Could not access document");
    let body = document.body().expect("Could not access document.body");
    let window = window().expect("Could not access window");

    let (canvas, num_cols, num_rows) = setup_canvas(&document, &window);
    let context = setup_context(&canvas).expect("Failed to setup 2d rendering context");

    // create grid
    let mut grid = Arc::new(pathfinding::Grid::new(num_cols, num_rows));

    // bind buttons
    let clear_button: Closure<dyn Fn(_)> = Closure::new(move |gri| {

    });

    render_grid(&context, num_cols, num_rows);
    render_cells();


}


fn test_function(element: HtmlCanvasElement) {
    console_log!(
        "Canvas Dimensions: {} {}",
        element.width(),
        element.height()
    );
}

fn start_app() {
    let document = window()
        .and_then(|win| win.document())
        .expect("Could not access document");
    let body = document.body().expect("Could not access document.body");

    let callback: Closure<dyn FnMut(_)> = Closure::new(|canvas| {
        test_function(canvas);
    });

    document
        .get_element_by_id("test-button")
        .expect("button not found")
        .add_event_listener_with_callback("click", callback.as_ref().unchecked_ref())
        .unwrap();
    callback.forget();

    let button = document.get_element_by_id("test-button");

    //// Canvas context example

    //     context.begin_path();

    // // Draw the outer circle.
    // context
    //     .arc(75.0, 75.0, 50.0, 0.0, f64::consts::PI * 2.0)
    //     .unwrap();

    // // Draw the mouth.
    // context.move_to(110.0, 75.0);
    // context.arc(75.0, 75.0, 35.0, 0.0, f64::consts::PI).unwrap();

    // // Draw the left eye.
    // context.move_to(65.0, 65.0);
    // context
    //     .arc(60.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
    //     .unwrap();

    // // Draw the right eye.
    // context.move_to(95.0, 65.0);
    // context
    //     .arc(90.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
    //     .unwrap();

    // context.stroke();
}

fn setup_buttons() {}

fn render_grid(context: &CanvasRenderingContext2d, cols: usize, rows: usize) {
    let line_colour = js_colour!(GRID_COLOUR);

    context.begin_path();
    context.set_stroke_style(&line_colour);
    context.set_line_width(GRID_LINE_WEIGHT as f64);

    // horizontal lines
    for row in 0..=rows {
        let start = (0.0, (row * CELL_SIZE + 1) as f64 );
        let end = ((cols * CELL_SIZE) as f64, start.1);
        context.move_to(start.0, start.1);
        context.line_to(end.0, end.1);
    }

    // vertical lines    
    for col in 0..=cols {
        let start = ((col * CELL_SIZE + GRID_LINE_WEIGHT) as f64, 0.0);
        let end = (start.0, (rows * CELL_SIZE) as f64);
        context.move_to(start.0, start.1);
        context.line_to(end.0, end.1);
    }

    context.stroke();
}

fn render_cells() {}

/// Sets up the canvas and its associated callbacks. Note that the canvas' size is defined by JS.
fn setup_canvas(document: &Document, window: &Window) -> (HtmlCanvasElement, usize, usize){
    // setup canvas
    let canvas = document
        .get_element_by_id("canvas")
        .expect("Canvas not found!");
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .expect("msg");

    let num_cols = window.inner_width().unwrap().as_f64().unwrap() as usize / CELL_SIZE;
    let num_rows = window.inner_height().unwrap().as_f64().unwrap() as usize / CELL_SIZE;

    // account for left/right and top/bot borders
    canvas.set_width((num_cols * CELL_SIZE + 2 * GRID_LINE_WEIGHT) as u32);
    canvas.set_height((num_rows * CELL_SIZE + 2 * GRID_LINE_WEIGHT) as u32);
 
    (canvas, num_cols, num_rows)
}

fn setup_context(canvas: &HtmlCanvasElement) -> Result<CanvasRenderingContext2d> {
    let context = canvas
        .get_context("2d").unwrap().unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>().unwrap();

    Ok(context)

}


