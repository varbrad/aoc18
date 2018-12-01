import sequtils
import sets
import strutils

const input = map(
  slurp"../inputs/input-1.txt".splitWhitespace,
  proc(i:string):int = i.parseInt
)

proc part1():string = $foldl(input, a + b)

proc part2():string =
  var
    cache = initSet[int]()
    c = 0
  while true:
    for n in input:
      c = c + n
      if c in cache:
        return $c
      cache.incl c
  return "Not Found"

echo part1()
echo part2()
