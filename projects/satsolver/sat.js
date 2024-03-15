class Literal {
  constructor(name) {
    this.name = name;
    this.negated = false;
    while (this.name.startsWith("!")) {
      this.name = this.name.substring(1);
      this.negated = !this.negated;
    }
  }

  negate() {
    let literal = this.clone();
    literal.negated = !literal.negated;
    return literal;
  }

  equals(literal) {
    return (literal.name == this.name && literal.negated == this.negated);
  }

  clone() {
    if (this.negated) {
      return new Literal(this.name).negate();
    } else {
      return new Literal(this.name);
    }
  }

  toString() {
    return (this.negated ? "!" : "") + this.name;
  }
}










class Clause {
  constructor() {
    this.literals = [];
    for (let i = 0; i < arguments.length; i++) {
      this.addLiteral(arguments[i]);
    }
  }

  addLiteral(name) {
    this.literals.push(new Literal(name));
  }

  contains(literal) {
    for (let i = 0; i < this.literals.length; i++) {
      if (this.literals[i].equals(literal)) {
        return true;
      }
    }
    return false;
  }

  removeLiteral(literal) {
    for (let i = 0; i < this.literals.length; i++) {
      if (this.literals[i].equals(literal)) {
        this.literals.splice(i, 1);
        i--;
      }
    }
  }

  getLiterals() {
    let res = [];
    for (let i = 0; i < this.literals.length; i++) {
      let literal = this.literals[i].toString();
      if (!res.includes(literal)) {
        res.push(literal);
      }
    }
    return res;
  }

  isEmpty() {
    return this.size() == 0;
  }

  size() {
    return this.literals.length;
  }

  clone() {
    let clause = new Clause();
    for (let i = 0; i < this.literals.length; i++) {
      clause.literals.push(this.literals[i].clone());
    }
    return clause;
  }

  toString() {
    let res = "{";
    for (let i = 0; i < this.literals.length; i++) {
      let literal = this.literals[i];
      res += literal.toString();
      if (i != this.literals.length-1) res += ", ";
    }
    return res + "}";
  }
}











class Formula {
  constructor() {
    this.clauses = [];
    this.solution = [];
  }

  addClause(clause) {
    this.clauses.push(clause);
  }

  setLiteral(literal) {
    this.solution.push(literal.toString());
    for (let i = 0; i < this.clauses.length; i++) {
      let clause = this.clauses[i];
      if (clause.contains(literal)) {
        this.clauses.splice(i, 1);
        i--;
      } else {
        clause.removeLiteral(literal.negate());
      }
    }
  }

  hasEmptyClause() {
    for (let i = 0; i < this.clauses.length; i++) {
      if (this.clauses[i].isEmpty()) {
        return true;
      }
    }
    return false;
  }

  getLiterals() {
    let res = [];
    let singleLiterals = [];
    for (let i = 0; i < this.clauses.length; i++) {
      for (let j = 0; j < this.clauses[i].literals.length; j++) {
        let literal = this.clauses[i].literals[j].toString();
        if (this.clauses[i].size() == 1) {
          singleLiterals.push(literal);
        } else if (!res.includes(literal)) {
          res.push(literal);
        }
      }
    }

    let pureLiterals = [];
    for (let i = 0; i < res.length; i++) {
      if (!res.includes(new Literal(res[i]).negate().toString())) {
        pureLiterals.push(res[i]);
        res.splice(i, 1);
      }
    }

    for (let i = 0; i < res.length; i++) {
      if (singleLiterals.includes(res[i]) || singleLiterals.includes(new Literal(res[i]).negate().toString())) {
        res.splice(i, 1);
      }
    }
    return {
      singleLiterals: singleLiterals,
      pureLiterals: pureLiterals,
      otherLiterals: res
    };
  }

  clone() {
    let formula = new Formula();
    formula.solution = [...this.solution];
    for (let i = 0; i < this.clauses.length; i++) {
      formula.clauses.push(this.clauses[i].clone());
    }
    return formula;
  }

  toString() {
    let res = "{";
    for (let i = 0; i < this.clauses.length; i++) {
      res += this.clauses[i].toString();
      if (i != this.clauses.length-1) res += ", ";
    }
    return res + "}";
  }
}








class SatSolver {
  // Resolvent Method
  // static formulaIsSolveable(formula) {
  //   for (let i = 0; i < formula.clauses.length; i++) {
  //     let literals = formula.clauses[i].getLiterals();
  //     for (let j = 0; j < literals.length; j++) {
  //       let literal = new Literal(literals[j]);
  //       for (let k = 0; k < formula.clauses.length; k++) {
  //
  //         if (i != k) {
  //           if (formula.clauses[k].contains(literal.negate())) {
  //             let combinedClause = new Clause();
  //             combinedClause.literals = [...formula.clauses[i].literals];
  //             combinedClause.literals = combinedClause.literals.concat([...formula.clauses[k].literals]);
  //             combinedClause.removeLiteral(literal);
  //             combinedClause.removeLiteral(literal.negate());
  //             if (!formula.clauses.includes(combinedClause)) {
  //               formula.clauses.push(combinedClause);
  //             }
  //             if (combinedClause.isEmpty()) {
  //               return false;
  //             }
  //             console.log(combinedClause.literals);
  //           }
  //         }
  //
  //       }
  //     }
  //   }
  //   return true;
  // }

  // Extended DPLL with OLR and PLR optimizations (Recursive)
  static findSatisfyingSolution(formula) {
    if (formula.hasEmptyClause()) {
      return false;
    }
    let literals = formula.getLiterals();
    if (literals.singleLiterals.length == 0 && literals.pureLiterals.length == 0 && literals.otherLiterals.length == 0) {
      return formula;
    }

    if (literals.singleLiterals.length > 0 || literals.pureLiterals.length > 0) {
      for (let i = 0; i < literals.singleLiterals.length; i++) {
        let literal = new Literal(literals.singleLiterals[i]);
        if (literal.negated) {
          formula.setLiteral(literal.negate());
        } else {
          formula.setLiteral(literal);
        }
      }
      for (let i = 0; i < literals.pureLiterals.length; i++) {
        let literal = new Literal(literals.pureLiterals[i]);
        formula.setLiteral(literal);
      }
      return SatSolver.findSatisfyingSolution(formula);
    }


    for (let i = 0; i < literals.otherLiterals.length; i++) {
      let literal = new Literal(literals.otherLiterals[i]);
      let variantA = formula.clone();
      let variantB = formula.clone();

      variantA.setLiteral(literal);
      let resA = SatSolver.findSatisfyingSolution(variantA);

      variantB.setLiteral(literal.negate());
      let resB = SatSolver.findSatisfyingSolution(variantB);

      if (resA == false && resB != false) {
        return variantB;
      } else if (resA != false && resB == false) {
        return variantA;
      } else if (resA != false && resB != false) {
        return "Conflict";
      } else {
        return "Not Solveable#2"
      }
    }
  }
}
