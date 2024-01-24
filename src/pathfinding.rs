use fixedbitset::{self, FixedBitSet};
use web_sys::js_sys::Math::ceil;

#[derive(Clone, Copy, Debug)]
enum CellRenderState {
    Empty,
    Wall,
    Explored,
    CurrentPath,
    CurrentHead,
}

#[derive(Clone, Copy, Debug)]
enum CellType {
    Wall,
    Path,
}

pub struct Grid {
    pub width: usize,
    pub height: usize,
    
    cells: Vec<CellType>,
    cells_state: Vec<CellRenderState>
}
impl Grid {
    pub fn new(width: usize, height: usize) -> Self {
        Self {
            width,
            height,
            cells: Vec::with_capacity(width * height),
            cells_state: Vec::with_capacity(width * height)
        }
    }

    /// Gets the CellType (wall or path) for the given cell.
    pub fn cell_type(&self, row: usize, col: usize) -> CellType {
        if (row < 0 || row >= self.height
            || col < 0 || col >= self.width) {
                CellType::Wall
        }
        else {
            self.cells[self.get_offset(row, col)]
        }
    }

    /// Gets the CellType (wall or path) for the given cell.
    pub fn cell_render_type(&self, row: usize, col: usize) -> CellRenderState {
        self.cells_state[self.get_offset(row, col)]
    }

    /// Toggles cell state
    pub fn toggle_cell(&self, row: usize, col: usize) {

    }

    fn get_offset(&self, row: usize, col: usize) -> usize {
        (row * self.width) + col
    }
}